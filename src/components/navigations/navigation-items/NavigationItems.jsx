import React from "react";
import classes from "./NavigationItems.module.scss";
import NavigationItem from "./navigation-item/NavigationItem";

const navigationItems = [
  {
    link: "/",
    text: "Burger Builder",
    exact: true,
  },
  {
    link: "/orders",
    text: "Orders",
    exact: false,
  },
];

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      {navigationItems.map((navigationItem, index) => {
        return (
          <NavigationItem
            key={navigationItem.text + index}
            link={navigationItem.link}
            active={navigationItem.active}
            exact={navigationItem.exact}
          >
            {navigationItem.text}
          </NavigationItem>
        );
      })}
    </ul>
  );
};

export default NavigationItems;
