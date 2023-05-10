import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Register = () => {

    const [formData , setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: ""
    })

    useEffect(() => {
        console.log(formData)
    })

    const handleRegister = async (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/register" , formData).then(res => {
            console.log(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <div>
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Sign Up</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleRegister}>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Name" required onChange={e => setFormData({...formData , name: e.target.value}) } />
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Surname" required onChange={e => setFormData({...formData , surname: e.target.value}) } />
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input type="email" className="form-control" placeholder="Email" required onChange={e => setFormData({...formData , email: e.target.value}) } />
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                                        </div>
                                        <input type="password" className="form-control" placeholder="Password" required onChange={e => setFormData({...formData , password: e.target.value}) } />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Register" className="btn float-right login_btn" />
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center links">
                                    have an account?<Link to="/login">Sign In</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
