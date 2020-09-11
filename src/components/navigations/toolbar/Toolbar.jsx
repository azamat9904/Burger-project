import React from "react";
import classes from "./Toolbar.module.scss";
import Logo from "../../logo/Logo";
import NavigationItems from "../navigation-items/NavigationItems";
import DrawerToggle from "../sidedrawer/drawer-toggle/DrawerToggle";

const Toolbar = ({ drawerToggleClick }) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={drawerToggleClick} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};
export default Toolbar;
