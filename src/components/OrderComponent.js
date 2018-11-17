import React from 'react';
import ReactToPrint from "react-to-print";

import icon from '../assets/kitchen/header-icon.svg'


export function OrderItem(props) {
    const {
        name,
        category,
        qty,
    } = props;
    return (
        <div className="order-item">
            <div id="legend-qty">{qty}</div>
            <div id="legend-item">
            {name}
            <br/>
            <text id="order-item-category">{category}</text>
            </div>
        </div>
    )
}
export function OrderCard(props) {
    const {
        order_type,
        table_number, 
        order_id, 
        waiter_name, 
        time,
        handleServeOrder,
        handleCancelOrder
        } = props;
        let order_card_ref = "";
    return (
        <div className="order-card-container">
            <div className="order-print"  ref={el => {order_card_ref = el}}>
                <div className="order-details">
                    <div className="detail-table">
                    <div>
                        <text id="text-bold">Table # {table_number}</text>
                        <text> {order_type} </text>
                    </div>
                    <div>{waiter_name}</div>
                    </div>
                    <div className="detail-order">
                    <div>Order # {order_id}</div>
                    <div>{time}</div>
                    </div>
                </div>
                <div className="order-legend">
                    <div id="legend-qty">QTY</div>
                    <div id="legend-item">ITEM DESCRIPTION</div>
                </div>
                <div className="order-list">
                {props.children}
                </div>
            </div>
            
            <div className="order-buttons">
                <div><button  className="button-entry" onClick={() => handleCancelOrder(order_id)}>Cancel</button></div>
                <div><ReactToPrint
                    trigger={() => <button className="button-entry">Print</button>}
                    content={() => order_card_ref}
                    onBeforePrint={() => alert('Prompt ni sa, Everything ready?')}
                /></div>
                {/* <button onClick={() => handleServeOrder(order_id)}>Ready to Serve</button>
                <button className ={classes.Print}><strong>PRINT</strong></button> */}
                <div><button className="button-entry" id="button-ready" onClick={() => handleServeOrder(order_id)}>Ready</button></div>
            </div>
        </div>
    )
}
export default function OrderComponent(props) {
    const {date} = props;

    return (
        <div id="orders-container">
            <div className="order-header">
            <img src={icon} alt=""></img>
            <label>{date}</label>
            </div>
            <div className="order-cards">
                {props.children} 
            </div>      
        </div>
    );
}