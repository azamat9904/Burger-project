import React from "react";
import classes from "./BuildControls.module.scss";
import BuildControl from "./build-control/BuildControl";

const controls = [
  {
    label: "Salad",
    type: "salad",
  },
  {
    label: "Bacon",
    type: "bacon",
  },
  {
    label: "Cheese",
    type: "cheese",
  },
  {
    label: "Meat",
    type: "meat",
  },
];

const BuildControls = ({
  ingredientAdded,
  ingredientRemoved,
  disabledList,
  price,
  disabled,
  ordered,
  isAuth,
}) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current price: <strong>{+price.toFixed(2)} $</strong>
      </p>
      {controls.map((control) => (
        <BuildControl
          key={control.label}
          label={control.label}
          added={() => ingredientAdded(control.type)}
          removed={() => ingredientRemoved(control.type)}
          disabled={disabledList[control.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={disabled}
        onClick={ordered}
      >
        {isAuth ? "Order now" : "Authenticated to order"}
      </button>
    </div>
  );
};

export default BuildControls;
