import React, { useState } from "react";

import "./Modal.css";

function Modal(props) {
    const [inputValue, setInputValue] = useState(props.name);

    const handleModelOff = () => {
        console.log("Shubham");
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
        <div className="modal" onClick={handleModelOff}>
            <div className="modal-content">
                <h2>Change {props.name ? "Name" : "Password"}</h2>
                <input type="text" value={inputValue} onChange={handleInputChange} />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default Modal;
