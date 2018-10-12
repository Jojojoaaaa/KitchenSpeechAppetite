import React from 'react';
import '../styles/OrderCardStyle.css';

export function OrderItem(props) {
    const {
        name,
        category,
        qty
    } = props;
    return (
        <div className="order-item">
            <p>{name} {category} {qty}</p>
        </div>
    )
}
export function OrderCard(props) {
    const {
        order_type,
        table_number, 
        order_id, 
        waiter_name, 
        time} = props;
    return (
        <div className="order-card-container">
            <p>{order_type}</p>
            <p>Table # {table_number}</p>
            <p>{waiter_name}</p>
            <p>Order # {order_id}</p>
            <p>{time}</p>
            <p>Item Description Qty</p>
            {props.children}
        </div>
    )
}
export default function OrderComponent(props) {
    return (
        <div className="orders_container">
            {props.children}
        </div>
    );
}