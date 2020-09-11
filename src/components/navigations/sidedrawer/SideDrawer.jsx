import React from "react";
import Logo from "../../logo/Logo";
import NavigationItems from "../navigation-items/NavigationItems";
import Backdrop from "../../ui/backdrop/Backdrop";

import classes from "./SideDrawer.module.scss";

const SideDrawer = ({ closed, open }) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (open) attachedClasses = [classes.SideDrawer, classes.Open];

  return (
    <>
      <Backdrop clicked={closed} show={open} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
