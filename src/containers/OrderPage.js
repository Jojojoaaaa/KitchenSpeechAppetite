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
      orders: [],
      date : moment().format("LL")
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
    }) 
    .catch(error => {
      alert("error");
    })

    setTimeout(this.retrieveAllOrders, 2000);
  }

  handleServeOrder = (order_id) => {
    const post_data = {
      order_id: order_id,
      status_update: status.READY
    };
    axios.post(url.MAIN_URL + url.UPDATE_ORDERS_STATUS, post_data)
      .then(response =>{
        if (response.data > 0) {
          alert('updated');
        }
        else {
          alert('error');
        }
      })
      .catch(error => {
        alert(error);
      });
  }
  handleCancelOrder = (order_id) => {
    const post_data = {order_id: order_id};
    axios.post(url.MAIN_URL + url.CANCEL_ORDER, post_data)
      .then(response =>{
        if (response.data > 0) {
            alert('deleted');
        }
        else {
            alert('error');
        }
      })
      .catch(error => {
        alert("error");
      })
  }
  
  render() {
    const {
      orders,
      date} = this.state;
    const handleServeOrder = this.handleServeOrder;
    const handleCancelOrder = this.handleCancelOrder;

    let order_cards = orders.map(order => {
      const time = moment(order.date).format('LT'); 
      return (
        <OrderCard
          key = {order.order_id}
          order_type = {order.order_type}
          table_number = {order.table_number}
          order_id = {order.order_id}
          waiter_name = {order.waiter_name}
          time = {time}
          handleServeOrder = {handleServeOrder}
          handleCancelOrder = {handleCancelOrder}>
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
    }); 
    return (
      <div>
        <OrderComponent
          date = {date}>
          {order_cards}
        </OrderComponent>
      </div>
    );
  }
}

export default OrderPage;
