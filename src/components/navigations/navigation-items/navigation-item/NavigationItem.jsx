import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.module.scss";

const NavigationItem = ({ link, children, exact, onSetRedirectPath }) => {
  const clickHandler = () => {
    if (onSetRedirectPath) onSetRedirectPath("/");
  };
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={link}
        activeClassName={classes.active}
        exact={exact}
        onClick={clickHandler}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
