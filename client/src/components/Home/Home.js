import React, { useState } from 'react'
import "./Home.css";
import { FaUserAlt, FaEdit } from "react-icons/fa";
import EditProfile from '../EditProfile';
import ChangePassword from './ChangePassword';

const Home = () => {
    const [editProfile, setEditProfile] = useState(false);
    const [editPassword, setEditPassword] = useState(false);

    const changePassword = async () => {

        console.log("change password");
    }

    const handleEdit = async () => {
        setEditProfile(!editProfile);
        console.log("Edit Profile");
    }
    return (
        <div className='profile-page'>

            <div className='nav-bar'>
                <h1>Profile</h1>
                <p>Logout</p>
            </div>

            <FaUserAlt size={100} />
            <h2>WELCOME!</h2>
            <div>
                <div className='user-name'>
                    <p><b>Name:&nbsp;&nbsp;</b>shubham</p>
                    <FaEdit style={{ marginLeft: 50, cursor: "pointer" }} size={25} onClick={handleEdit} />

                </div>
                {editProfile ? <EditProfile setEditProfile={setEditProfile} /> : ""}
                <div className='user-email'>
                    <p><b>Email:&nbsp;&nbsp;</b>shubham@gmail.com</p>

                </div>
                <button onClick={changePassword}>change password</button>
            </div>

        </div>
    )
}

export default Home;