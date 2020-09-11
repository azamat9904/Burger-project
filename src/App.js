import React, { Component } from "react";
import Layout from "./components/layout/Layout";
import BurgerBuilder from "./containers/burger-builder/BurgerBuilder";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Layout>
        <BurgerBuilder />
      </Layout>
    );
  }
}

export default App;
