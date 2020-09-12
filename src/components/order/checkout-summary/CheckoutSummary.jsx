import React from "react";
import Burger from "../../burger/Burger";
import Button from "../../ui/button/Button";
import classes from "./CheckoutSummary.module.scss";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCanceled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        Continue
      </Button>
    </div>
  );
};

export default CheckoutSummary;
