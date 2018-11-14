import React from 'react';

import logo from '../assets/kitchen/icon.png'
import login from '../assets/kitchen/btn-login.png'

export default function LoginComponent(props) {
    const {
        handlePasswordInput,
        handleLogin,
        password,
        } = props;
    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">
                <img src={logo}></img>
                </div>
                <div>
                    <div className="lbl-admin">Welcome, Admin!</div>
                    <br/>
                    <input
                        className="txt-password"
                        type='password'
                        onChange={(e) => handlePasswordInput(e.target.value)}/>
                    <br/>
                    
                    <button onClick={() => handleLogin(password)} className="btn-login">Log-in</button>
                </div>
            </div>
        </div>
    );
}