import React from "react";
import classes from "./NavigationItems.module.scss";
import NavigationItem from "./navigation-item/NavigationItem";

const navigationItems = [
  {
    link: "/",
    text: "Burger Builder",
    exact: true,
    showEveryTime: true,
    hasClickHandler: false,
  },
  {
    link: "/orders",
    text: "Orders",
    exact: false,
    showEveryTime: false,
    showOnAuth: true,
    hasClickHandler: false,
  },
  {
    link: "/auth",
    text: "Authenticate",
    exact: false,
    showEveryTime: false,
    showOnAuth: false,
    hasClickHandler: true,
  },
  {
    link: "/logout",
    text: "Logout",
    exact: false,
    showEveryTime: false,
    showOnAuth: true,
    hasClickHandler: false,
  },
];

const NavigationItems = ({ isAuthenticated, onSetRedirectPath }) => {
  return (
    <ul className={classes.NavigationItems}>
      {navigationItems.map((navigationItem, index) => {
        let show = false;
        if (navigationItem.showEveryTime) show = true;
        if (
          !navigationItem.showEveryTime &&
          navigationItem.showOnAuth === isAuthenticated
        )
          show = true;
        return (
          <>
            {show && (
              <NavigationItem
                key={navigationItem.text + index}
                link={navigationItem.link}
                active={navigationItem.active}
                exact={navigationItem.exact}
                onSetRedirectPath={
                  navigationItem.hasClickHandler ? onSetRedirectPath : null
                }
              >
                {navigationItem.text}
              </NavigationItem>
            )}
          </>
        );
      })}
    </ul>
  );
};

export default NavigationItems;
