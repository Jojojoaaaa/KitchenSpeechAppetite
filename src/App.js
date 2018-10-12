import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import OrderPage from './containers/OrderPage';
import LoginPage from './containers/LoginPage';

import * as routes from './constants/routes';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path={routes.ORDERS} component = {OrderPage}/>
          <Route exact path={routes.LOGIN} component = {LoginPage}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
