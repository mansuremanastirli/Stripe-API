import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./login.css"
import { Link } from 'react-router-dom'

const Login = ({ authUser, user, setUser }) => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleLogin = async (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/login", formData).then(res => {
            console.log(res.data.token)
            localStorage.setItem("token", JSON.stringify(res.data.token))
            setUser(res.data.user)
            authUser()
            window.location = "/"

        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign In</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="email" className="form-control" placeholder="Email" onChange={e => { setFormData({ ...formData, email: e.target.value }) }} />
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="Password" onChange={e => { setFormData({ ...formData, password: e.target.value }) }} />
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Login" className="btn float-right login_btn" />
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Don't have an account?<Link to="/register">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
