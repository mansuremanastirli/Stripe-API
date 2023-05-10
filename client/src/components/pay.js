import { CardElement, useElements, useStripe, Elements } from "@stripe/react-stripe-js"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import "./pay.css"


const Pay = ({ authUser, user }) => {

    const navigate = useNavigate()

    const PUBLIC_KEY = "pk_test_51N4R8aFIUozdePsIuti8BIiC7xlYZBk39q1vITQyW7uyEQf2DdcWYkBopkne8iq7wG7ZX9uoAnUBmwW0ieVCkMmD00LnmmWynX"


    useEffect(() => {
        if (!authUser()) {
            navigate("/login")
        }
    }, [])

    const CARD_OPTIONS = {
        iconStyle: "solid",
        style: {
            base: {
                iconColor: "#c4f0ff",
                color: "#fff",
                fontWeight: 500,
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",
                ":-webkit-autofill": { color: "#fce883" },
                "::placeholder": { color: "#87bbfd" },
                backgroundColor: "black"
            },
            invalid: {
                iconColor: "#ffc7ee",
                color: "#ffc7ee"
            }
        }
    }

    const stripe = useStripe()
    const elements = useElements()

    const [amount, setAmount] = useState(0)
    const [successMessage, setSuccessMessage] = useState("Successful Payment")
    const [errorMessage, setErrorMessage] = useState("Paymnet Failed")
    const [successKontrol, setSuccessKontrol] = useState(false)
    const [errorKontrol, setErrorKontrol] = useState(false)


    const handleSubmit = async (e) => {
        authUser()
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


        if (!error) {
            try {
                const { id } = paymentMethod
                const response = await axios.post("http://localhost:5000/payment", {
                    amount: amount,
                    id
                }, {
                    headers: {
                        'Authorization': `${PUBLIC_KEY}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })

                if (response.data.success) {
                    console.log("Successful payment")
                    setSuccessKontrol(true)
                }

            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
            setErrorMessage(error.message)
            setErrorKontrol(true)
        }
    }


    return (
        <div>
            <h1 style={{ color: "white", textAlign: "center" }}>Hoşgeldin: {user?.name}</h1>
            <h1 style={{ color: "white", textAlign: "center" }}>{successKontrol ? successMessage : null}</h1>
            <h1 style={{ color: "white", textAlign: "center" }}>{errorKontrol ? errorMessage : null}</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <CardElement options={CARD_OPTIONS} />
                <br />
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-body">
                                <div className="input-group form-group">
                                    <input type="text" className="form-control" placeholder="Amount" onChange={e => setAmount(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Pay
