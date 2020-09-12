import React, { Component } from "react";
import Burger from "../../components/burger/Burger";
import BurgerControls from "../../components/burger/build-controls/BuildControls";
import Modal from "../../components/ui/modal/Modal";
import OrderSummary from "../../components/burger/order-summary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/ui/spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Centralizer from "../../hoc/centeralizer/Centralizer";

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
      ingredients: null,
      totalPrice: 0,
      purchasabe: false,
      purchasing: false,
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(({ data }) => {
        this.setState({ ingredients: data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
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

  purchaseContinueHandler = async () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    let disabledList = {};

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Centralizer>
        <Spinner />
      </Centralizer>
    );

    if (this.state.ingredients) {
      const ingredients = this.state.ingredients;
      Object.keys(ingredients).forEach((key, i) => {
        disabledList[key] = ingredients[key] <= 0;
      });

      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BurgerControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabledList={disabledList}
            price={this.state.totalPrice}
            disabled={!this.state.purchasabe}
            ordered={this.purchaseHandler}
          />
        </>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          modalClosed={this.purchaseCancelHandler}
          onContinue={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading)
      orderSummary = (
        <Centralizer>
          <Spinner />
        </Centralizer>
      );

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

export default withErrorHandler(BurgerBuilder, axios);
