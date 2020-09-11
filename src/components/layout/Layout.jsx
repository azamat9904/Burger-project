import React, { Component } from "react";
import Aux from "../../hoc/Auxilary";
import classes from "./Layout.module.scss";
import Toolbar from "../navigations/toolbar/Toolbar";
import SideDrawer from "../navigations/sidedrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosesHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  drawerToggleClick = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClick={this.drawerToggleClick} />
        <SideDrawer
          closed={this.sideDrawerClosesHandler}
          open={this.state.showSideDrawer}
        />
        <div>Toolbar, Sidedrawer, Backdrop</div>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
