import React from "react";
import classes from "./Burger.module.scss";
import BurgerIngredient from "./burger-ingredient/BurgerIngredient";

const Burger = ({ ingredients }) => {
  let transformedIngredients = Object.keys(ingredients)
    .map((key) => {
      return [...Array(ingredients[key])].map((v, i) => (
        <BurgerIngredient type={key} key={key + i} />
      ));
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
