import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../axios';
import moment from 'moment';

import * as url from '../constants/urls';
import * as status from '../constants/type';
import * as routes from '../constants/routes';

import OrderComponent, {OrderCard, OrderItem} from '../components/OrderComponent';

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      date : moment().format("LL")
    }
  }
  componentWillMount() {
    if (!this.props.auth) {
      this.props.history.push(routes.LOGIN);
    }
    else {
      this.retrieveAllOrders();
    }
  }
  componentDidMount() {
  }
  componentWillUnmount() {
    clearTimeout(this.update);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.orders !== this.state.orders);
  }
  retrieveAllOrders = () => {
    const post_data = {status: status.PENDING};

    axios.post(this.props.main_url + url.RETRIEVE_ORDERS, post_data)
    .then(response => {
      let orders = response.data;
      this.setState({orders: orders});
    }) 
    .catch(error => {
      alert("error");
      clearTimeout(this.update);
    })

    this.update = setTimeout(this.retrieveAllOrders, 2000);
  }

  handleServeOrder = (order_id) => {
    const post_data = {
      order_id: order_id,
      status_update: status.READY
    };
    axios.post(this.props.main_url + url.UPDATE_ORDERS_STATUS, post_data)
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
    axios.post(this.props.main_url + url.CANCEL_ORDER, post_data)
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

const mapStateToProps = state => {
  return {
    auth: state.auth,
    main_url: state.main_url
  };
}

export default connect(mapStateToProps)(OrderPage);
