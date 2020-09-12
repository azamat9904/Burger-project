import React from "react";
import CheckoutSummary from "../../components/order/checkout-summary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../../containers/checkout/contact-data/ContactData";

class Checkout extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutContinued={this.checkoutContinuedHandler}
          checkoutCanceled={this.checkoutCanceledHandler}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
            />
          )}
        />
      </>
    );
  }
}

export default Checkout;
