import { Field, getFormAsyncErrors, reduxForm } from "redux-form";
import React, { Component } from "react";

import ReduxFormTemplate from "./ReduxFormTemplate";
import { connect } from "react-redux";

class ReduxFormContainer extends Component {
  componentWillMount() {
    this.ReduxFormEl = reduxForm({
      form: this.props.formName,
      initialValues: this.props.initialValues || {},
      asyncValidate: this.props.asyncValidate || undefined,
      asyncBlurFields: this.props.asyncBlurFields || undefined
    })(ReduxFormTemplate);
  }
  render() {
    const ReduxFormEl = this.ReduxFormEl;
    return <ReduxFormEl {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    asyncErrorsCaller: getFormAsyncErrors("s2pProductModalForm")(state)
  };
};

export default connect(mapStateToProps, null)(ReduxFormContainer);
