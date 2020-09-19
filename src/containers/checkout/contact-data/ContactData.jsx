import React, { Component } from "react";
import Button from "../../../components/ui/button/Button";
import classes from "./ContactData.module.scss";
import axios from "../../../axios-orders";
import Spinner from "../../../components/ui/spinner/Spinner";
import Input from "../../../components/ui/input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { Redirect } from "react-router-dom";
class ContactData extends Component {
  state = {
    formData: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliiveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastests", displayValue: "Fastests" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        validation: {},
        value: "fastests",
        valid: true,
      },
    },
    formIsValid: false,
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) return;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const formData = {};

    Object.keys(this.state.formData).forEach((key) => {
      formData[key] = this.state.formData[key].value;
    });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };

    this.props.sendOrder(order, this.props.token);
  };

  inputChangedHandler = (event, key) => {
    const value = event.target.value;

    const valid = this.checkValidity(
      value,
      this.state.formData[key].validation
    );

    let formIsValid = true;
    Object.keys(this.state.formData).forEach((k) => {
      formIsValid = this.state.formData[k].valid && formIsValid;
    });

    const formData = {
      ...this.state.formData,
      [key]: {
        ...this.state.formData[key],
        value,
        valid,
        touched: true,
      },
    };

    this.setState({ formData: formData, formIsValid: formIsValid });
  };

  render() {
    const inputArray = Object.keys(this.state.formData).map((key) => {
      return {
        key: key,
        elementType: this.state.formData[key].elementType,
        elementConfig: this.state.formData[key].elementConfig,
        value: this.state.formData[key].value,
        valid: this.state.formData[key].valid,
        touched: this.state.formData[key].touched,
      };
    });

    const inputElements = inputArray.map((element) => {
      return (
        <Input
          elementType={element.elementType}
          elementConfig={element.elementConfig}
          value={element.value}
          key={element.key}
          changed={(event) => this.inputChangedHandler(event, element.key)}
          invalid={!element.valid}
          touched={element.touched}
        />
      );
    });

    const redirect = this.props.purchasing ? <Redirect to="/" /> : null;
    return (
      <>
        {redirect}
        <div className={classes.ContactData}>
          <h4>Enter your contact data</h4>
          {this.props.loading ? (
            <Spinner />
          ) : (
            <form onSubmit={this.orderHandler}>
              {inputElements}
              <Button
                btnType="Success"
                clicked={this.orderHandler}
                disabled={!this.state.formIsValid}
              >
                Order
              </Button>
            </form>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerState.ingredients,
    price: state.burgerState.totalPrice,
    loading: state.orderState.loading,
    purchasing: state.orderState.purchasing,
    token: state.authState.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendOrder: (orderData, token) =>
      dispatch(actions.sendOrderStart(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
