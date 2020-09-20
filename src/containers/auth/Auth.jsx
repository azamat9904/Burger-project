import React, { Component } from "react";
import Input from "../../components/ui/input/Input";
import Button from "../../components/ui/button/Button";
import classes from "./Auth.module.scss";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/ui/spinner/Spinner";
import { Redirect } from "react-router-dom";
import { checkValidity } from "../../shared/utils";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    isSignUp: true,
  };

  switchAuthHandler = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };

  inputChangedHandler = (event, key) => {
    const value = event.target.value;

    const valid = checkValidity(value, this.state.controls[key].validation);

    let formIsValid = true;
    Object.keys(this.state.controls).forEach((k) => {
      formIsValid = this.state.controls[k].valid && formIsValid;
    });

    const formData = {
      ...this.state.controls,
      [key]: {
        ...this.state.controls[key],
        value,
        valid,
        touched: true,
      },
    };

    this.setState({ controls: formData, formIsValid: formIsValid });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  render() {
    const inputArray = Object.keys(this.state.controls).map((key) => {
      return {
        key: key,
        elementType: this.state.controls[key].elementType,
        elementConfig: this.state.controls[key].elementConfig,
        value: this.state.controls[key].value,
        valid: this.state.controls[key].valid,
        touched: this.state.controls[key].touched,
      };
    });

    const form = inputArray.map((element) => {
      return (
        <Input
          key={element.key}
          elementType={element.elementType}
          elementConfig={element.elementConfig}
          value={element.value}
          changed={(event) => this.inputChangedHandler(event, element.key)}
          invalid={!element.valid}
          touched={element.touched}
        />
      );
    });
    let element = null;
    if (this.props.error) {
      element = <p>{this.props.error.message}</p>;
    }
    return (
      <div className={classes.Auth}>
        {this.props.isAuthenticated && (
          <Redirect to={this.props.redirectPath} />
        )}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.onSubmitHandler}>
            {element}
            {form}
            <Button btnType="Success">Submit</Button>
            <Button btnType="Danger" clicked={this.switchAuthHandler}>
              Switch to {this.state.isSignUp ? "sign in" : "sign up"}
            </Button>
          </form>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.authState.loading,
    error: state.authState.error,
    isAuthenticated: state.authState.token !== null,
    redirectPath: state.orderState.redirectPath,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
