import React from 'react';

import logo from '../assets/kitchen/icon.svg'

export default function LoginComponent(props) {
    const {
        handlePasswordInput,
        handleLogin,
        password,
        handleChangeIPClick,
        } = props;
    return (
        <div className="login-container">
            <div className="login-box">
                <button
                    onClick={() => handleChangeIPClick()}>Change ip address</button>
                {props.children}
                <div className="logo">
                <img src={logo} alt=""></img>
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