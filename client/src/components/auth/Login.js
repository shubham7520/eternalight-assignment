import React, { useEffect, useState } from 'react'
import "./Auth.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate('');

    const handleClick = async () => {
        if (!email || !password) {
            setError(true);
            return;
        }
        setError(false);

        await axios.post(`http://localhost:8000/api/v1/login`, { email, password }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(response.data);
            localStorage.setItem("Token", response.data.Token);
            navigate('/');
        }).catch(error => console.log(error.response.data));

    }

    useEffect(() => {
        // if (localStorage.getItem("Token")) {
        //     navigate("/")
        // }
    }, [navigate])

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