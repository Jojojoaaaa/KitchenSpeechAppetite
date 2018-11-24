import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../axios';
import moment from 'moment';

import * as url from '../constants/urls';
import * as status from '../constants/type';
import * as routes from '../constants/routes';
import * as type from '../constants/type';

import empty from '../assets/kitchen/icon-empty.svg';
import '../styles/OrderStyle.css';

import OrderComponent, {OrderCard, OrderItem} from '../components/OrderComponent';
import ModalComponent from '../components/ModalComponent';
import PromptModalComponent from '../components/PromptModalComponent';

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      date : moment().format("l"),
      show: false,
      show_prompt: '',
      confirm_method: '',
      modal_type: '',
      modal_message: ''
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
  retrieveAllOrders = () => {
    const post_data = {status: status.PENDING};

    axios.post(this.props.main_url + url.RETRIEVE_ORDERS, post_data)
    .then(response => {
      let orders = response.data;
      this.setState({orders: orders});
    }) 
    .catch(error => {
      this.setState({
        show: true,
        modal_type: type.ERROR,
        modal_message: type.PRE_ERROR_MESSAGE + error.message + type.POST_ERROR_MESSAGE
      })
      clearTimeout(this.update);
    })

    this.update = setTimeout(this.retrieveAllOrders, 2000);
  }

  handleServeOrder = (order_id) => {
    this.setState({
      show_prompt: true,
      confirm_method: () => this.serveOrder(order_id),
      modal_message: 'Are you sure the order is ready?'
    })
  }
  serveOrder = (order_id) => {
    const post_data = {
      order_id: order_id,
      status_update: status.READY
    };
    axios.post(this.props.main_url + url.UPDATE_ORDERS_STATUS, post_data)
      .then(response =>{
        if (response.data > 0) {
          this.setState({
            show: true,
            show_prompt: false,
            modal_type: type.SUCCESS,
            modal_message: 'Order has been updated.'
          })
        }
        else {
          this.setState({
            show: true,
            show_prompt: false,
            modal_type: type.ERROR,
            modal_message: 'Something went wrong...'
          })
        }
      })
      .catch(error => {
        this.setState({
          show: true,
          modal_type: type.ERROR,
          modal_message: type.PRE_ERROR_MESSAGE + error.message + type.POST_ERROR_MESSAGE
        })
      });
  }
  handleCancelOrder = (order_id) => {
    this.setState({
      show_prompt: true,
      confirm_method: () => this.cancelOrder(order_id),
      modal_message: 'Are you sure you want to cancel order?'
    })
  }
  cancelOrder = (order_id) => {
    const post_data = {order_id: order_id};
    axios.post(this.props.main_url + url.CANCEL_ORDER, post_data)
      .then(response =>{
        if (response.data > 0) {
          this.setState({
            show: true,
            show_prompt: false,
            modal_type: type.SUCCESS,
            modal_message: 'Order has been deleted'
          })
        }
        else {
          this.setState({
            show: true,
            show_prompt: false,
            modal_type: type.ERROR,
            modal_message: 'Something went wrong...'
          })
        }
      })
      .catch(error => {
        this.setState({
          show: true,
          modal_type: type.ERROR,
          modal_message: type.PRE_ERROR_MESSAGE + error.message + type.POST_ERROR_MESSAGE
        })
      })
  }
  handleHideModal = () => {
    this.setState({show:false});
  }
  handleHidePromptModal = () => {
    this.setState({show_prompt:false});
  }
  render() {
    const {
      orders,
      date,
      show,
      modal_type,
      modal_message,
      show_prompt,
      confirm_method} = this.state;
    const handleServeOrder = this.handleServeOrder;
    const handleCancelOrder = this.handleCancelOrder;
    const handleHideModal = this.handleHideModal;
    const handleHidePromptModal = this.handleHidePromptModal;
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
    const no_order = (
      (!orders[0])
        ?
          <div className='empty-state'><img src={empty}></img>No orders for now</div>
        :
        null
    )
    const modal = (
      show
      ?
        <ModalComponent
          modal_type={modal_type}
          modal_message={modal_message}
          handleClick={handleHideModal}/>
      :
        null
    );
    const prompt_modal = (
      show_prompt 
        ?
          <PromptModalComponent
            handleConfirm ={confirm_method}
            handleDecline={handleHidePromptModal}
            modal_message={modal_message}/>
        :
        null
    )
    return (
      <div>
        <OrderComponent
          date = {date}>
          {order_cards}
          {modal}
          {prompt_modal}
          {no_order}
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
