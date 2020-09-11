import React, { Component } from "react";
import classes from "./Modal.module.scss";
import Backdrop from "../backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }
  render() {
    return (
      <>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
            pointerEvents: this.props.show ? "auto" : "none",
          }}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Modal;
