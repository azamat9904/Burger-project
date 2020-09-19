import React from "react";
import { Component } from "react";
import Order from "../../components/order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/ui/spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    return (
      <>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <div>
            {this.props.orders.map((order) => (
              <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
              />
            ))}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orderState.orders,
    loading: state.orderState.loading,
    token: state.authState.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
