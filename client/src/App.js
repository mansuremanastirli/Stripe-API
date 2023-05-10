import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import './App.css';
import axios from "axios"
import Pay from './components/pay';
import Register from './components/register';
import Login from './components/login';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function App() {

  const navigate = useNavigate()

  const PUBLIC_KEY = "pk_test_51N4R8aFIUozdePsIuti8BIiC7xlYZBk39q1vITQyW7uyEQf2DdcWYkBopkne8iq7wG7ZX9uoAnUBmwW0ieVCkMmD00LnmmWynX"

  const stripeTestPromise = loadStripe(PUBLIC_KEY)
  const [user, setUser] = useState(null)

  const authUser = async () => {
    await axios.get("http://localhost:5000/auth", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      }
    }).then(res => {
      setUser(res.data.user)
    }).catch(error => {
      navigate("/login")
    })
  }

  return (
    <div>
      <Elements stripe={stripeTestPromise}>
        <Routes>
          <Route path="/" element={<Pay authUser={authUser} user={user} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login authUser={authUser} user={user} setUser={setUser} />} />
        </Routes>
      </Elements>
    </div>
  );
}

export default App;
