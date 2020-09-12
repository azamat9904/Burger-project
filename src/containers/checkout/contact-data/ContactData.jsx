import React, { Component } from "react";
import Button from "../../../components/ui/button/Button";
import classes from "./ContactData.module.scss";
import axios from "../../../axios-orders";
import Spinner from "../../../components/ui/spinner/Spinner";
import { withRouter } from "react-router-dom";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postCode: "",
    },
    loading: false,
  };

  componentDidMount() {
    console.log(this.props.ingredients);
  }
  orderHandler = async (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: "Namiyaly Azamat",
      address: {
        street: "Test street 1",
        zipCode: "41351",
      },
      email: "Test@gmail.com",
    };
    try {
      let response = await axios.post("/orders.json", order);
      this.setState({ loading: false });
      this.props.history.push({ pathname: "/" });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <form>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className={classes.Input}
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              className={classes.Input}
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              className={classes.Input}
            />
            <input
              type="text"
              name="postal"
              placeholder="Postal Code"
              className={classes.Input}
            />
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
