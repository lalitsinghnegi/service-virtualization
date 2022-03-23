import { userAvailabilityCheck } from "../../../utils/api";

// asynchronous redux form validators, reach out to an api
export const asyncFormUserAvailabilityValidator = async (
  values,
  dispatch,
  props,
  currentFieldName
) => {
  // check with server if username and/or email is in use.
  if (values.username === "" && values.email === "")
    return { username: false, email: false };

  let errors = {};

  try {
    const response = await userAvailabilityCheck(values.email);
    if (!response.email) errors["email"] = "That email is already in use";
  } catch (e) {
    console.error("Error checking username/email availability");
    // scenario: if for whatever reason communication to availability endpoint is UNAVAILABLE but signup endpoint is AVAILABLE
    // signup endpoint error will be handled regardless if the user tries to signup with UNAVAILABLE credentials
    // default to mark both fields as available.
    return { username: true, email: true };
  }

  if (Object.keys(errors).length > 0) {
    throw errors;
  }
};
