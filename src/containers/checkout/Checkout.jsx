import React from "react";
import CheckoutSummary from "../../components/order/checkout-summary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../../containers/checkout/contact-data/ContactData";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";

class Checkout extends React.Component {
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    this.props.changePurchasingStatus(false);
  }
  render() {
    const hasIngredients = this.props.ingredients !== null;
    console.log(hasIngredients, this.props.ingredients);
    return hasIngredients ? (
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
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerState.ingredients,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePurchasingStatus: (isInit) => dispatch(actions.sendOrderInit(isInit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
