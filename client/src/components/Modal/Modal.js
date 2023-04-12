import React, { useState } from "react";

import "./Modal.css";

function Modal(props) {
    const [inputValue, setInputValue] = useState(props.name);

    const handleModelOff = () => {
        props.setShowModal(null);
    }

    const handleInputChange = (event) => {
        if (props.name) {
            props.setName(event.target.value)
        } else {
            props.setPassword(event.target.value)
        }
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        if (props.name) {
            props.handleProfileUpdate()
        } else {
            props.handlePasswordUpdate()
        }
    };

    return (
        <div className="modal">
            <div className="modal-content" >
                <h2>Change {props.name ? "Name" : "Password"}</h2>
                <input type="text" value={inputValue} onChange={handleInputChange} />
                <div style={{ display: "flex", paddingLeft: "4px" }}>
                    <button onClick={handleSubmit}>Submit</button>
                    <button style={{ backgroundColor: "red", }} onClick={handleModelOff}>Cancle</button>
                </div>

            </div>
        </div>
    );
}

export default Modal;
