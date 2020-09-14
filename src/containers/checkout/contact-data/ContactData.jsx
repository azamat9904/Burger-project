import React, { Component } from "react";
import Button from "../../../components/ui/button/Button";
import classes from "./ContactData.module.scss";
import axios from "../../../axios-orders";
import Spinner from "../../../components/ui/spinner/Spinner";
import { withRouter } from "react-router-dom";
import Input from "../../../components/ui/input/Input";

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
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
      },
      deliiveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastests", displayValue: "Fastests" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
      },
    },
    loading: false,
  };

  orderHandler = async (event) => {
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

    try {
      await axios.post("/orders.json", order);
      this.setState({ loading: false });
      this.props.history.push({ pathname: "/" });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  inputChangedHandler = (event, key) => {
    const value = event.target.value;
    const formData = {
      ...this.state.formData,
      [key]: { ...this.state.formData[key], value },
    };
    this.setState({ formData: formData });
  };

  render() {
    const inputArray = Object.keys(this.state.formData).map((key) => {
      return {
        key: key,
        elementType: this.state.formData[key].elementType,
        elementConfig: this.state.formData[key].elementConfig,
        value: this.state.formData[key].value,
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
        />
      );
    });

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.orderHandler}>
            {inputElements}
            <Button btnType="Success" clicked={this.orderHandler}>
              Order
            </Button>
          </form>
        )}
      </div>
    );
  }
}
export default withRouter(ContactData);
