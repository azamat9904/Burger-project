import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-orders";

export const sendOrderSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.SEND_ORDER_SUCCESS,
    orderId,
    orderData,
  };
};

export const sendOrderFailed = (error) => {
  return {
    type: actionTypes.SEND_ORDER_FAILED,
    error: error,
  };
};

export const sendOrderLoading = () => {
  return {
    type: actionTypes.SEND_ORDER_LOADING,
  };
};

export const sendOrderInit = (purchasing) => {
  return {
    type: actionTypes.SEND_ORDER_INIT,
    purchasing,
  };
};

export const sendOrderStart = (orderData, token) => {
  return (dispatch) => {
    dispatch(sendOrderLoading());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then(({ data }) => {
        dispatch(sendOrderSuccess(data.name, orderData));
        dispatch(sendOrderInit(true));
      })
      .catch((error) => dispatch(sendOrderFailed(error)));
  };
};

export const fetchOrderInit = () => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error,
  };
};

export const fetchOrders = (token) => {
  return (dispatch) => {
    dispatch(fetchOrderInit());
    axios
      .get("/orders.json?auth=" + token)
      .then((response) => {
        const myOrders = [];
        Object.keys(response.data).forEach((key) => {
          myOrders.push({ id: key, ...response.data[key] });
        });
        dispatch(fetchOrdersSuccess(myOrders));
      })
      .catch((error) => dispatch(fetchOrdersFailed(error)));
  };
};

export const setBurgerBuildStatus = (status) => {
  return {
    type: actionTypes.SET_BURGER_BUILD_STATUS,
    status,
  };
};

export const setRedirectPath = (path) => {
  return {
    type: actionTypes.SET_REDIRECT_PATH,
    path,
  };
};
