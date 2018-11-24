import React from 'react';

import logo from '../assets/kitchen/icon.svg'
import change from  '../assets/kitchen/icon-settings.svg'
export default function LoginComponent(props) {
    const {
        handlePasswordInput,
        handleLogin,
        password,
        handleChangeIPClick,
        } = props;
    return (
        <div className="login-container">
            <div className='login-change'><img className='button-change' src={change} onClick={() => handleChangeIPClick()}></img></div>
                {props.children}
            <div className="login-box">
                <div className="logo">
                <img src={logo} alt=""></img>
                </div>
                <div className="lbl-admin">Welcome, Admin!</div>
                <div className='login-password'>
                    <input
                        className="txt-password"
                        type='password'
                        onChange={(e) => handlePasswordInput(e.target.value)}/>
                </div>
                <div className='login-button'>
                <button onClick={() => handleLogin(password)} className="btn-login">Log-in</button>
                </div>
            </div>
        </div>
    );
}