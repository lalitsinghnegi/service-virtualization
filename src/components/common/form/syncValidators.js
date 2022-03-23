// synchronous redux form validators

import { isAlphanumeric, isEmail, isNumeric } from "validator";

export const commonFieldValidator = values => {
  const errors = {};
  console.log(values);

  const adborIdsEntries = Object.entries(values).filter(
    entry => entry[0].match("^adborId-").length > 0
  );
  adborIdsEntries.forEach(adborIdEntry => {
    if (
      !adborIdEntry[1] ||
      !isNumeric(adborIdEntry[1]) ||
      adborIdEntry[1].length < 7 ||
      adborIdEntry[1].length > 9
    )
      errors[adborIdEntry[0]] = "Invalid Adbor ID";
  });

  return errors;
};

export const signinFormValidator = values => {
  const errors = {};

  if (!values.usernameOrEmail) {
    errors.usernameOrEmail = "Please enter a valid username or email";
  }

  if (!values.password || values.password.length < 4) {
    errors.password = "Your password is at least 4 characters";
  }

  // If errors is empty, form is fine to submit If errors has any properties,
  // redux form assumes form is invalid
  return errors;
};

export const forgotPwdFormValidator = values => {
  const errors = {};

  if (!values.email || !isEmail(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  return errors;
};

export const signupFormValidator = values => {
  const errors = {};

  if (values.username) {
    if (values.username.length < 5) {
      errors.username = "Username must be at least 5 characters";
    }
    if (!isAlphanumeric(values.username)) {
      errors.username = "Username must be alphanumeric";
    }
    if (values.username.length > 15) {
      errors.username = "Username cannot be more then 15 characters";
    }
  } else {
    errors.username = "Please enter a valid username";
  }

  if (values.name) {
    if (values.name.length < 5) {
      errors.name = "Name must be at least 5 characters";
    }
    if (values.name.length > 40) {
      errors.name = "Name cannot be more then 40 characters";
    }
  } else errors.name = "Please enter a valid name";

  if (!values.email || !isEmail(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (values.email && values.email.length > 60) {
    errors.email = "Email cannot be more then 60 characters";
  }

  if (values.password) {
    if (values.password.length < 4) {
      errors.password = "Your password must be least 4 characters";
    } else if (values.password.length > 20) {
      errors.password = "Password cannot be more then 20 characters";
    }
  } else {
    errors.password = "Please enter a valid password";
  }

  if (!values.password || values.password !== values.cPassword) {
    errors.cPassword = "You must confirm your password";
  }

  if (!values.team) {
    errors.team = "You must select a team";
  }

  if (!values.captchaToken && errors === {}) {
    // only display error if all other errors are not present
    errors.captchaToken = "error";
  }

  // If errors is empty, form is fine to submit
  // If errors has any properties, redux form assumes form is invalid
  return errors;
};

export const billingAddressValidator = values => {
  const errors = {};

  if (!values.address) {
    errors.address = "Required";
  }
  if (!values.locality) {
    errors.locality = "Required";
  }
  if (!values.postcode && typeof values.postcode !== "number") {
    errors.postcode = "Only numbers are allowed";
  }
  if (!values.state) {
    errors.state = "Required";
  }
  if (!values.country) {
    errors.country = "Required";
  }
  return errors;
};
