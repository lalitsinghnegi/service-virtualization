import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from "prop-types";

import config from "../../../config";

const SITE_KEY = config.recaptcha.siteKeyInvisible;

class CaptchaInvisible extends Component {
  componentDidMount() {
    this.execute();
  }

  execute() {
    this.onChange(null);
    this.refs.captcha.execute();
  }

  onChange(data) {
    this.props.input.onChange(data);
  }

  render() {
    return (
      <div>
        {this.props.meta.touched && this.props.meta.error}
        <ReCAPTCHA
          ref="captcha"
          size="invisible"
          sitekey={SITE_KEY}
          onExpired={this.execute}
          onChange={data => this.onChange(data)}
        />
      </div>
    );
  }
}

CaptchaInvisible.propTypes = {
  input: PropTypes.object.isRequired
};

export default CaptchaInvisible;
