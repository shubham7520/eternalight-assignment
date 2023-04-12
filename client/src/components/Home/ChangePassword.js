import React from 'react'

const ChangePassword = (props) => {
    return (
        <div className="d-backdrop">
            <div className="d-modal">
                <header className="d-header">
                    <h2>{props.title}</h2>
                </header>
                <div className="d-content">
                    <p>{props.message}</p>
                </div>
                <footer className="d-actions">
                    <button onClick={props.onConfirm}>Confirm</button>
                </footer>
            </div>
        </div>
    )
}

export default ChangePassword;