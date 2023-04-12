import React, { useState } from 'react'
import "./Auth.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = async () => {
        await axios.post(`http://localhost:8000/api/v1/login`, { email, password }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            localStorage.setItem("Token", res.data.Token);
            props.setToken(res.data.token)
            window.location.reload()
        }).catch(error => console.log(error.response.data));

    }

    return (
        <div className='login-page'>
            <div className='login-container'>
                <h1 className='login-heading'>Welcome!</h1>
                <div className='login-field'>
                    <input type="email" placeholder='Enter Email' onChange={(e) => { setEmail(e.target.value) }} value={email} required />
                    <input type="password" placeholder='Enter Password' onChange={(e) => { setPassword(e.target.value) }} value={password} required />
                    <button onClick={handleClick}>Login</button>
                </div>
                <div className='already'>
                    <p>Don't have an account? <Link to="/signup" className='already-link'><b>Register.</b></Link></p>
                </div>

            </div>
        </div>
    )
}

export default Login;