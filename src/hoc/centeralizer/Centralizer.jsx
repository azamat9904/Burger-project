import React from "react";
import classes from "./Centralizer.module.scss";

const Centralizer = ({ children }) => {
  return <div className={classes.Centralizer}>{children}</div>;
};

export default Centralizer;
