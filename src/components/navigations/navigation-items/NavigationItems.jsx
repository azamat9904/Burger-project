import React from "react";
import classes from "./NavigationItems.module.scss";
import NavigationItem from "./navigation-item/NavigationItem";

const navigationItems = [
  {
    link: "/",
    active: true,
    text: "Burger Builder",
  },
  {
    link: "/",
    active: false,
    text: "Checkout",
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
          >
            {navigationItem.text}
          </NavigationItem>
        );
      })}
    </ul>
  );
};

export default NavigationItems;
