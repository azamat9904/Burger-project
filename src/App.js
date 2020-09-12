import React, { Component } from "react";
import Layout from "./components/layout/Layout";
import BurgerBuilder from "./containers/burger-builder/BurgerBuilder";
import Checkout from "./containers/checkout/Checkout";
import { Route, Switch } from "react-router-dom";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
