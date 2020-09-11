import React, { Component } from "react";
import Aux from "../../hoc/Auxilary";
import Burger from "../../components/burger/Burger";
import BurgerControls from "../../components/burger/build-controls/BuildControls";
import Modal from "../../components/ui/modal/Modal";
import OrderSummary from "../../components/burger/order-summary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
      },
      totalPrice: 0,
      purchasabe: false,
      purchasing: false,
    };
  }

  onChangePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).reduce((sum, key) => {
      return sum + ingredients[key];
    }, 0);

    this.setState({
      purchasabe: sum > 0,
    });
  };

  onCalculate = (type, operationType) => {
    const sign = operationType === "ADD" ? 1 : -1;
    const oldCount = this.state.ingredients[type];
    if (sign === -1 && oldCount === 0) return;
    const updatedCount = oldCount + 1 * sign;
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: updatedCount,
    };
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition * sign;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });
    this.onChangePurchaseState(updatedIngredients);
  };

  addIngredientHandler = (type) => {
    this.onCalculate(type, "ADD");
  };

  removeIngredientHandler = (type) => {
    this.onCalculate(type, "SUBSTRACT");
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
    alert("You are continue");
  };
  render() {
    let disabledList = {};
    const ingredients = this.state.ingredients;
    Object.keys(ingredients).forEach((key, i) => {
      disabledList[key] = ingredients[key] <= 0;
    });

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            modalClosed={this.purchaseCancelHandler}
            onContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BurgerControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledList={disabledList}
          price={this.state.totalPrice}
          disabled={!this.state.purchasabe}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
