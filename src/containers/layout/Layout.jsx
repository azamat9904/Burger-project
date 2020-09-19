import React, { Component } from "react";
import Aux from "../../hoc/Auxilary";
import classes from "./Layout.module.scss";
import Toolbar from "../../components/navigations/toolbar/Toolbar";
import SideDrawer from "../../components/navigations/sidedrawer/SideDrawer";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

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
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClick={this.drawerToggleClick}
          onSetRedirectPath={this.props.onSetRedirectPath}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          closed={this.sideDrawerClosesHandler}
          open={this.state.showSideDrawer}
          onSetRedirectPath={this.props.onSetRedirectPath}
        />
        <div>Toolbar, Sidedrawer, Backdrop</div>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authState.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetRedirectPath: (path) => {
      dispatch(actions.setRedirectPath(path));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
