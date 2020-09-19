import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  orderCompleted: false,
  purchasing: false,
  isBurgerBuild: false,
  redirectPath: "/",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_ORDER_SUCCESS:
      const order = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        orders: state.orders.concat(order),
        loading: false,
      };

    case actionTypes.SEND_ORDER_FAILED:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.SEND_ORDER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SEND_ORDER_INIT:
      return {
        ...state,
        purchasing: action.purchasing,
      };
    case actionTypes.FETCH_ORDERS_INIT:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };
    case actionTypes.FETCH_ORDERS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.SET_BURGER_BUILD_STATUS:
      return {
        ...state,
        isBurgerBuild: action.status,
      };
    case actionTypes.SET_REDIRECT_PATH:
      return {
        ...state,
        redirectPath: action.path,
      };
    default:
      return state;
  }
};

export default reducer;
