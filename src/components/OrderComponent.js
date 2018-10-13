import React from 'react';
import '../styles/OrderCardStyle.css';

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
    return (
        <div className="order-card-container">
            <p>{order_type}</p>
            <p>Table # {table_number}</p>
            <p>{waiter_name}</p>
            <p>Order # {order_id}</p>
            <p>{time}</p>
            <p>Item Description Qty</p>
            {props.children}
            <button onClick={() => handleServeOrder(order_id)}>Ready to Serve</button> <br/>
            <button onClick={() => handleCancelOrder(order_id)}>x</button>
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