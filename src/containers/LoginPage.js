import React, { Component } from 'react';
import { connect } from 'react-redux';


import axios from '../axios';

import LoginComponent from '../components/LoginComponent';
import ModalComponent from '../components/ModalComponent';
import PromptModalComponent, {IPInputComponent} from '../components/PromptModalComponent';

import * as url from '../constants/urls';
import * as routes from '../constants/routes';
import * as actions from '../store/actions';
import * as type  from '../constants/type';

import '../styles/OrderStyle.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      show: false,
      change_ip: false,
      ip_address: '',
      modal_type: '',
      modal_message: '',
    }
    
  }
  componentWillMount() {
  }
  
  handlePasswordInput = password => {
    this.setState({password: password})
  }
  handleHideModal = () => {
    this.setState({show:false});
  }
  handleHidePrompt=()=> {
    this.setState({
      change_ip:false
    })
  }
  onIPInputchange = (ip_address) => {
    console.log(ip_address);
    this.setState({
      ip_address: ip_address
    });
  }
  handleChangeIPClick = () => {
    this.setState({
      change_ip: true,
      modal_message: 'Enter IP Address to change'
    })
  }
  handleIPAddressChange = () =>{
    const {ip_address} = this.state;
    this.props.onSetIPAddress(ip_address);
    this.setState({
      change_ip: false,
      show: true,
      modal_type: type.SUCCESS,
      modal_message: 'IP Address has been changed.'
    })
  }
  handleLogin = password => {
    const post_data = {password: password};
    axios.post(this.props.main_url + url.LOGIN, post_data)
      .then(response => {
        if (response.data === 0) {
          this.props.onLogin();
          this.props.history.push(routes.ORDERS);
        }
        else {
          this.setState({
            show: true,
            modal_type: type.ERROR,
            modal_message: type.PASSWORD_ERROR 
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
  render() {
    const {
      password,
      modal_message,
      modal_type,
      show,
      ip_address,
      change_ip
      } = this.state;
    const handlePasswordInput = this.handlePasswordInput;
    const handleLogin = this.handleLogin;
    const handleHideModal = this.handleHideModal;
    const handleChangeIPClick = this.handleChangeIPClick;
    const handleIPAddressChange = this.handleIPAddressChange;
    const handleHidePrompt = this.handleHidePrompt;
    const onIPInputchange = this.onIPInputchange;
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
    const prompt = (
      change_ip
        ?
          <PromptModalComponent
            handleConfirm={handleIPAddressChange}
            handleDecline={handleHidePrompt}
            modal_message={modal_message}>
            <IPInputComponent
              ip_address={ip_address}
              onIPInputchange={onIPInputchange}/>
          </PromptModalComponent>
        :
          null
    ) 
    return (
      <div>
        <LoginComponent
          handlePasswordInput={handlePasswordInput}
          handleLogin={handleLogin}
          password={password}
          handleChangeIPClick={handleChangeIPClick}>
          {modal}
          {prompt}
        </LoginComponent>
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

const mapDispatchToProps = dispatch => {
  return {
    onLogin: () => dispatch(actions.authorize()),
    onSetIPAddress: (ip_address) => dispatch(actions.setIpAddress(ip_address))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
