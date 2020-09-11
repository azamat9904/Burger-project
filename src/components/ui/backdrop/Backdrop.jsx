import React from "react";
import classes from "./Backdrop.module.scss";

const Backdrop = ({ show, clicked }) => {
  return show ? (
    <div className={classes.Backdrop} onClick={clicked}></div>
  ) : null;
};
export default Backdrop;
