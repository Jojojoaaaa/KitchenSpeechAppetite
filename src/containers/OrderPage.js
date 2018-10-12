import React, { Component } from 'react';

import axios from '../axios';
import moment from 'moment';

import * as url from '../constants/urls';
import * as status from '../constants/type';
import OrderComponent, {OrderCard, OrderItem} from '../components/OrderComponent';

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }
  }
  componentDidMount() {
   this.retrieveAllOrders();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.orders !== this.state.orders);
  }
  retrieveAllOrders = () => {
    const post_data = {status: status.PENDING};

    axios.post(url.MAIN_URL + url.RETRIEVE_ORDERS, post_data)
    .then(response => {
      let orders = response.data;
      this.setState({orders: orders});
      this.retrieveAllOrdersItems(orders);
    }) 
    .catch(error => {
      alert("error");
    })

    //setTimeout(this.retrieveAllOrders, 5000);
  }
  retrieveAllOrdersItems = (orders) => {
    orders.forEach((order, i) =>{
      this.retrieveOrderItems(order.order_id, i);
    });
  }
  retrieveOrderItems = (order_id, order_index) => {
    let orders = [...this.state.orders];
    const post_data = {order_id: order_id};

    axios.post(url.MAIN_URL + url.RETRIEVE_ORDERS_ITEM, post_data)
    .then(response => {
     orders[order_index].items = response.data;
     this.setState({orders: orders});
    })
    .catch(error => {
      console.log(error);
    })
  }
  render() {
    const {orders} = this.state;

    let order_cards = orders.map(order => {
      const time = moment(order.date).format('LT'); 
      return (
        <OrderCard
          key = {order.order_id}
          order_type = {order.order_type}
          table_number = {order.table_number}
          order_id = {order.order_id}
          waiter_name = {order.waiter_name}
          time = {time}>
            {order.items.map((item, i) => {
              return (
                <OrderItem
                  key = {order.order_id + "" + i}
                  name = {item.order_item}
                  category = {item.category}
                  qty = {item.qty}
                />
              )
            })}
         </OrderCard>
      )
    }) 
    return (
      <div>
        <OrderComponent>
          {order_cards}
        </OrderComponent>
      </div>
    );
  }
}

export default OrderPage;
