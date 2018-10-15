import React from 'react';
import ReactToPrint from "react-to-print";

import '../styles/OrderStyle.css';

export function OrderItem(props) {
    const {
        name,
        category,
        qty,
    } = props;
    return (
        <div className="order-item">
            <p>{name} {qty}</p>
            <p className="order-item-category">{category}</p>
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
        <div 
            className="order-card-container">    
            <div 
                ref={el => {order_card_ref = el}}>
                <p>(MAY DESIGN NI SA YA)</p>
                <p>{order_type}</p>
                <p>Table # {table_number}</p>
                <p>{waiter_name}</p>
                <p>Order # {order_id}</p>
                <p>{time}</p>
                <p>Item Description Qty</p>
                {props.children}
            </div>
            {/* gin lain ko ni na div ang buttons para di sa madala sa print view hekhek */}
            <div>
                <ReactToPrint
                    trigger={() => <button>Ready to Serve</button>}
                    content={() => order_card_ref}
                    onBeforePrint={() => alert('Prompt ni sa, Everything ready?')}
                    onAfterPrint={() => handleServeOrder(order_id)}
                />
                {/* <button onClick={() => handleServeOrder(order_id)}>Ready to Serve</button>
                <button className ={classes.Print}><strong>PRINT</strong></button> */}
                <br/>
                <button onClick={() => handleCancelOrder(order_id)}>x</button>
            </div>
        </div>
    )
}
export default function OrderComponent(props) {
    const {date} = props;

    return (
        <div className="orders_container">
            <label>{date}</label>
            <div className="order-cards">
                {props.children}
            </div>
        </div>
    );
}