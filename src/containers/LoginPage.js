import React, { Component } from 'react';
import { connect } from 'react-redux';


import axios from '../axios';

import LoginComponent from '../components/LoginComponent';

import * as url from '../constants/urls';
import * as routes from '../constants/routes';
import * as actions from '../store/actions';

import '../styles/OrderStyle.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    }
    
  }
  componentWillMount() {
  }
  
  handlePasswordInput = password => {
    this.setState({password: password})
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
          alert('Password is incorrect!');
        }      
      })
      .catch(error => {
        alert("There's been a " + error.message + ", please make sure you are connected to the server using the correct IP address and that the server is running.");
      });
  }
  render() {
    const {
      password
      } = this.state;

    const handlePasswordInput = this.handlePasswordInput;
    const handleLogin = this.handleLogin;

    return (
      <div>
        <LoginComponent
          handlePasswordInput={handlePasswordInput}
          handleLogin={handleLogin}
          password={password}/>
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
