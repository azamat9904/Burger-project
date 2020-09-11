import React, { Component } from "react";
import Modal from "../../components/ui/modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentDidMount = () => {
      axios.interceptors.request.use((request) => {
        this.setState({ error: null });
        return request;
      });

      axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          this.setState({ error: error });
        }
      );
    };

    onCloseHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          <Modal show={this.state.error} modalClosed={this.onCloseHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />;
        </>
      );
    }
  };
};

export default withErrorHandler;
