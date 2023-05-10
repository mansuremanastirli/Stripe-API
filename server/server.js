const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
const routes = require("./routes")
const stripe = require("stripe")
const bodyParser = require("body-parser")

dotenv.config()

const app = express()

const PORT = 5000

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json())
app.use(cors())
app.use("/", routes)

app.listen(PORT, () => {
    console.log("Server Dinleniyor")
    mongoose.connect(process.env.MONGO_STRING)
        .then(() => console.log("databaseye bağlandi"))
})