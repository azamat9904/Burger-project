import React from "react";
import CheckoutSummary from "../../components/order/checkout-summary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../../containers/checkout/contact-data/ContactData";
import { connect } from "react-redux";

class Checkout extends React.Component {
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
          ingredients={this.props.ingredients}
          checkoutContinued={this.checkoutContinuedHandler}
          checkoutCanceled={this.checkoutCanceledHandler}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          component={ContactData}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
