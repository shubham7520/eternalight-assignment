import React, { useEffect, useState } from 'react'
import "./Home.css";
import { FaUserAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
import Modal from "../Modal/Modal"

const Home = (props) => {
    const [user, setUser] = useState();
    const [showModal, setShowModal] = useState(null);
    const [name, setName] = useState(null)
    const [password, setPassword] = useState("")

    const userData = async () => {
        await axios.get(`http://localhost:8000/api/v1/userDetail`, {
            headers: {
                "x-access-token": localStorage.getItem("Token")
            }
        }).then((res) => {
            setUser(res.data.user);
            setName(res.data.user.name)
        }).catch(error => console.log(error.res.data));
    }

    const handleProfileUpdate = async () => {
        await axios.put(`http://localhost:8000/api/v1/updateProfile`, { name }, {
            headers: {
                "x-access-token": props.token
            }
        }).then((res) => {
            setUser(res.data.user);
        }).catch(error => console.log(error.response.data));
        setShowModal(null)
    }
    const handlePasswordUpdate = async () => {
        await axios.put(`http://localhost:8000/api/v1/updatePassword`, { newPassword: password }, {
            headers: {
                "x-access-token": props.token
            }
        }).then((res) => {
            setUser(res.data.user);
        }).catch(error => console.log(error.response.data));
        setShowModal(null)
    }

    useEffect(() => {
        userData();
    }, [])

    return (
        <React.Fragment>
            {showModal && (showModal === "name" ? <Modal name={name} setName={setName} handleProfileUpdate={handleProfileUpdate} /> : <Modal password={password} setPassword={setPassword} handlePasswordUpdate={handlePasswordUpdate} />)}
            <div className='profile-page'>
                <div className='nav-bar'>
                    <h1>Profile</h1>
                    <p onClick={() => { localStorage.clear(); window.location.reload() }}>Logout</p>
                </div>

                <FaUserAlt size={100} />
                <h2>WELCOME!</h2>
                <div>
                    <div className='user-name'>
                        <p><b>Name:&nbsp;&nbsp;</b>{user?.name}</p>
                        <FaEdit style={{ marginLeft: 50, cursor: "pointer" }} size={25} onClick={() => setShowModal("name")} />

                    </div>
                    <div className='user-email'>
                        <p><b>Email:&nbsp;&nbsp;</b>{user?.email}</p>

                    </div>
                    <button onClick={() => setShowModal("password")}>change password</button>
                </div>

            </div>
        </React.Fragment>
    )
}

export default Home;