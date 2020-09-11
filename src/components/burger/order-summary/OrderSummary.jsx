import React from "react";
import Aux from "../../../hoc/Auxilary";
import Button from "../../ui/button/Button";

const OrderSummary = ({ ingredients, modalClosed, onContinue, price }) => {
  const ingredientsSummary = Object.keys(ingredients).map((key) => {
    return (
      <li key={key}>
        <span style={{ textTransform: "capitalize" }}>{key}</span> :{" "}
        {ingredients[key]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>{ingredientsSummary}</ul>
      <p>
        Total Price: <strong>{+price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout ?</p>
      <Button btnType="Danger" clicked={modalClosed}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={onContinue}>
        Continue
      </Button>
    </Aux>
  );
};

export default OrderSummary;
