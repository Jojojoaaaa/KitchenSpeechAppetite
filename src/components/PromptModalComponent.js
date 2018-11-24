import React from 'react';
export function IPInputComponent(props) {
    const {
        ip_address,
        onIPInputchange
    } = props;

    return (
        <input
            type='text'
            value={ip_address}
            onChange={(e) => onIPInputchange(e.target.value)}/>
    )
}
export default function PromptModalComponent(props) {
    const {
       handleConfirm,
       handleDecline,
       modal_message
    } = props;

    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <img
                    alt = 'question mark'/>
                <p>{modal_message}</p>
                {props.children}
                <span 
                    className="close"
                    onClick={()=>handleConfirm()}>Confirm</span>
                <span 
                    className="close"
                    onClick={()=>handleDecline()}>Cancel</span>
            </div>
        </div>  
    );
}