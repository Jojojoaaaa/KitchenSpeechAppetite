import React, { Component } from 'react';

import axios from '../axios';

class OrderPage extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {
    axios.get('http://192.168.254.100/android_queries/retrieveMenu.php')
      .then(response => {
        console.log(response.data);
      })
      .catch(error =>{
        console.log(error);
      })
  }
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default OrderPage;
