import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from "prop-types";

import config from "../../../config";

const SITE_KEY = config.recaptcha.siteKey;
const Captcha = props => (
  <div>
    {props.meta.touched && props.meta.error}
    <ReCAPTCHA
      sitekey={SITE_KEY}
      onChange={response => props.input.onChange(response)}
    />
  </div>
);

Captcha.propTypes = {
  input: PropTypes.object.isRequired
};

export default Captcha;
