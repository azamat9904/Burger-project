import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import burgerBuilderReducer from "./reducers/burgerBuilder";
import orderReducer from "./reducers/order";
import authReducer from "./reducers/auth";

const composeEnhancer =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const reducers = combineReducers({
  burgerState: burgerBuilderReducer,
  orderState: orderReducer,
  authState: authReducer,
});

const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));
export default store;
