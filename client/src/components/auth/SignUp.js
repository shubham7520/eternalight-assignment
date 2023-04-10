import React, { useState, useEffect } from 'react'
import "./Auth.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleClick = async () => {

        if (!name || !email || !password) {
            setError(true);
            return;
        }
        setError(false);

        await axios.post(`http://localhost:8000/api/v1/register`, { name, email, password }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(response);
            localStorage.setItem("Token", response.data.Token);
            navigate('/');
        }).catch(error => console.log(error.response.data));
    }


    useEffect(() => {
        // if (localStorage.getItem("Token")) {
        //     navigate("/")
        // }
    }, [navigate]);

    return (
        <div className='signup-page'>
            <div className='signup-container'>
                <h1 className='signup-heading'>Registration</h1>
                <div className='signup-field'>
                    <input type="text" placeholder='Enter Name' onChange={(e) => { setName(e.target.value) }} value={name} required />
                    <input type="email" placeholder='Enter Email' onChange={(e) => { setEmail(e.target.value) }} value={email} required />
                    <input type="password" placeholder='Enter Password' onChange={(e) => { setPassword(e.target.value) }} value={password} required />
                    <button onClick={handleClick}>Register</button>
                </div>
                <div className='already'><p>Already registered? <Link to="/login" className='already-link'><b>Login.</b></Link></p></div>

            </div>
        </div>
    )
}

export default SignUp;