import { isAlphanumeric, isEmail, isNumeric } from "validator";

const isValidAusLandline = value =>
  value.match(new RegExp("^0(?:2|3|7|8)[0-9]{8}$")) !== null;

export const adborIdValidator = value => {
  if (!value) return "Can not be null";
  if (!isNumeric(value)) return "Adbor ID must be a number";
  if (value.length < 7) return "Adbor ID is too short";
  if (value.length > 9) return "Adbor ID is too long";
};

export const fnnValidator = value => {
  if (value === undefined || value === null) return; // Don't validate supplied fnn
  if (!isNumeric(value)) return "FNN must be a number";
  if (value.length !== 10) return "FNN does not match length format";
  if (!isValidAusLandline(value)) return "FNN is not valid Aus landline";
};

export const rangeValidator = value => {
  if (!value) return "Can not be null";
  if (!isNumeric(value)) return "Range must be a number";
  if (value.length <= 0 || value.length > 3)
    return "Range does not match length format";
};
