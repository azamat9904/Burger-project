import React, { Component } from "react";
import Layout from "./containers/layout/Layout";
import BurgerBuilder from "./containers/burger-builder/BurgerBuilder";
import Checkout from "./containers/checkout/Checkout";
import Orders from "./containers/orders/Orders";

import { Route, Switch } from "react-router-dom";
import Auth from "./containers/auth/Auth";
import Logout from "./containers/auth/logout/Logout";
import { connect } from "react-redux";
import "./App.css";
import * as actions from "./store/actions/index";
import { Redirect } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSigup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authState.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSigup: () => dispatch(actions.authCheckState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
