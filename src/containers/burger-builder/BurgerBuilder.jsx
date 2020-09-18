import React, { Component } from "react";
import Burger from "../../components/burger/Burger";
import BurgerControls from "../../components/burger/build-controls/BuildControls";
import Modal from "../../components/ui/modal/Modal";
import OrderSummary from "../../components/burger/order-summary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/ui/spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Centralizer from "../../hoc/centeralizer/Centralizer";
import { connect } from "react-redux";
import * as burgerBuilderActions from "../../store/actions/index";

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasing: false,
    };
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  onChangePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).reduce((sum, key) => {
      return sum + ingredients[key];
    }, 0);

    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false,
    });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    let disabledList = {};

    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Centralizer>
        <Spinner />
      </Centralizer>
    );

    if (this.props.ingredients) {
      const ingredients = this.props.ingredients;
      Object.keys(ingredients).forEach((key) => {
        disabledList[key] = ingredients[key] <= 0;
      });

      burger = (
        <>
          <Burger ingredients={this.props.ingredients} />
          <BurgerControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabledList={disabledList}
            price={this.props.price}
            disabled={!this.onChangePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandler}
          />
        </>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          modalClosed={this.purchaseCancelHandler}
          onContinue={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerState.ingredients,
    price: state.burgerState.totalPrice,
    error: state.burgerState.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => {
      dispatch(burgerBuilderActions.addIngredient(ingName));
    },
    onIngredientRemoved: (ingName) => {
      dispatch(burgerBuilderActions.removeIngredient(ingName));
    },
    onInitIngredients: () => {
      dispatch(burgerBuilderActions.initIngredients());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
