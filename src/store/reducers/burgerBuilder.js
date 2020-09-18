import * as actionTypes from "../actions/actionTypes";

const inititalState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
  loading: true,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      let count = state.ingredients[action.ingredientName];
      if (count - 1 >= 0) count--;
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: count,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 0,
      };
    case actionTypes.FETCH_INGREDIENT_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
export default reducer;
