import Select from "react-select";
import React from "react";

// redux form field re-usable components
export function renderField(field) {
  // const type = field.type
  //     ? field.type
  //     : 'text';  commenting as unused
  switch (field.type) {
    case "select":
      return renderSelectField(field);
    case "selectWithCustomHeight":
      return renderSelectFieldWithCustomHeight(field);
    default:
      return renderTextField(field);
  }
}

const renderTextField = field => {
  const {
    meta: { asyncValidating, touched, error, valid },
    help,
    invalid,
    asyncText,
    validMsg,
    showValidMsg = true,
    disabled,
    feedback,
    placeholder
  } = field;
  const feedbackEnabled = feedback === undefined ? true : feedback; // control whether ui feedback is given
  const hasValidated =
    touched && // field has been visited and blurred
    valid && // field has no error
    !asyncValidating;
  const type = field.type ? field.type : "text";
  const className = `form-group ${touched && error ? "has-danger" : ""}`;
  return (
    <div className={className}>
      {field.label && (
        <label className="form-control-label">{field.label}</label>
      )}
      <input
        className={`form-control ${
          (touched && error) || field.invalid ? "is-invalid" : ""
        } ${hasValidated && feedbackEnabled ? "is-valid" : ""}`}
        type={type}
        {...field.input}
        disabled={disabled}
        placeholder={placeholder}
        tabIndex={field.tabIndex}
      />{" "}
      {(!error || error !== "") && !touched && help && !disabled && (
        <small className="form-text text-muted">{help}</small>
      )}
      {asyncValidating && feedbackEnabled && (
        <small className="form-text text-muted">
          {asyncText ? asyncText : "Checking availability..."}
        </small>
      )}
      {!disabled && !invalid && feedbackEnabled && showValidMsg && (
        <div className="valid-feedback">
          {validMsg ? validMsg : "Looks good!"}
        </div>
      )}
      {feedbackEnabled && (
        <div className="invalid-feedback">
          {touched && !asyncValidating ? error : ""}
        </div>
      )}
    </div>
  );
};

const renderSelectField = ({
  input,
  help,
  meta: { touched, error },
  invalid,
  options,
  name,
  id,
  feedback,
  children,
  label,
  validMsg,
  ...custom
}) => {
  const className = `form-group ${touched && error ? "has-danger" : ""}`;
  // const feedbackEnabled = (feedback == undefined)
  //     ? true
  //     : feedback; // control whether ui feedback is given
  const { onChange, onFocus } = input;
  const selectStyles = {
    valueContainer: provided => ({
      ...provided,
      height: "40px"
    })
  };
  return (
    <div className={className}>
      <label className="form-control-label">{label}</label>
      <Select
        name={input.name}
        onChange={({ value }) => onChange(value)}
        onBlurResetsInput={false}
        onCloseResetsInput={false}
        onFocus={onFocus}
        options={options}
        isSearchable={false}
        styles={selectStyles}
      />
      <small className="form-text text-muted">{help}</small>
    </div>
  );
};

// const renderRadioField = ({
//     value,
//     input,
//     ...custom
// }) => (<Input type="radio" checked={value === input.value} {...input} {...custom} />);

// const renderCheckbox = ({
//     input: {
//         value,
//         onChange
//     }
// }) => (<Input type="checkbox" checked={!!value} onChange={onChange} />);

// for custom height and default value
const renderSelectFieldWithCustomHeight = ({
  input,
  help,
  meta: { asyncValidating, touched, error, valid },
  invalid,
  options,
  // name,
  // id,
  feedback,
  children,
  label,
  validMsg,
  height,
  disabled,
  showValidMsg = true
}) => {
  const className = `form-group ${touched && error ? "has-danger" : ""}`;
  const feedbackEnabled = feedback === undefined ? true : feedback; // control whether ui feedback is given
  const { onChange, onFocus } = input;
  const hasValidated =
    touched && // field has been visited and blurred
    valid && // field has no error
    !asyncValidating;
  const selectStyles = {
    valueContainer: provided => ({
      ...provided,
      height
    }),
    control: base => ({
      ...base,
      borderColor: touched && error ? "red" : "#ced4da",
      "&:hover": {
        borderColor: "none"
      }
    })
  };

  return (
    <div className={className}>
      <label className="form-control-label">{label}</label>
      <Select
        className={`${(touched && error) || invalid ? "is-invalid" : ""} ${
          hasValidated && feedbackEnabled ? "is-valid" : ""
        }`}
        name={input.name}
        value={options.filter(option => option.label === input.value)}
        onChange={({ value }) => onChange(value)}
        onBlurResetsInput={false}
        onCloseResetsInput={false}
        onFocus={onFocus}
        options={options}
        isSearchable={false}
        styles={selectStyles}
      />
      {(!error || error !== "") && !touched && help && !disabled && (
        <small className="form-text text-muted">{help}</small>
      )}
      {!disabled && !invalid && feedbackEnabled && showValidMsg && (
        <div
          className="valid-feedback"
          style={{ display: touched && !error && "inherit" }}
        >
          {validMsg ? validMsg : "Looks good!"}
        </div>
      )}
      {feedbackEnabled && (
        <div
          className="invalid-feedback"
          style={{ display: touched && error && "inherit" }}
        >
          {touched && !asyncValidating ? error : ""}
        </div>
      )}
    </div>
  );
};
