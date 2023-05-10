const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router();
const userSchema = require("./userSchema")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_API_KEY)


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.sendStatus(401)
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedToken
    next()
}



router.post("/register", async (req, res) => {
    const { name, surname, email, password } = req.body

    const user = await userSchema.findOne({ email });

    if (user) {
        return res.status(400).json({ message: "Email zaten kayıtlı" })
    }
    if (password.length < 8) {
        return res.status(400).json({ message: "Şifre 8 karakterden kısa olamaz" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const saveDB = await userSchema.create({
        name,
        surname,
        email,
        password: hashedPassword
    })

    return res.status(201).json({ saveDB: saveDB, message: "Hesap Oluşturuldu" })

})

router.post("/payment", async (req, res) => {
    let { amount, id } = req.body
    try {

        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "TRY",
            description: "İlk Ödeme",
            payment_method: id,
            confirm: true,
        })
        console.log("Payment", payment)
        res.json({
            message: "Payment successful",
            success: true
        })
    } catch (error) {
        console.log("Error", error)
        res.json({
            message: "Payment failed",
            success: false
        })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email })

    if (!user) {
        return res.status(400).json({ message: "Email veya Şifre Yanlış" })
    }

    const comparedPass = await bcrypt.compare(password, user.password)

    if (!comparedPass) {
        return res.status(400).json({ message: "Email veya Şifre Yanlış" })
    }

    const payloads = {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60
    }

    const token = jwt.sign(payloads, process.env.JWT_SECRET)

    return res.status(200).json({ message: "Giriş Başarılı", token: token })

})


router.get("/auth", verifyToken, (req, res) => {
    return res.status(200).json({ user: req.user })
})



module.exports = router