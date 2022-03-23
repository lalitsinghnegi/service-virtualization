import React, { Component } from "react";

const ReduxFormTemplate = props => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    children,
    formClass = "tdm-rf-form-base",
    propsDepth = 1,
    dispatch,
    formName,
    asyncValidating
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className={formClass}>
        {renderChildWithProps(
          children,
          { dispatch, formName, asyncValidating },
          propsDepth
        )}
      </div>
    </form>
  );
};

// Allows the use of rendering children with specified props.
// This can traverse through children with a depth of maxDepth
// NOTE this will only assign the parent props to the children with 'assignProps' as true
const renderChildWithProps = (
  children,
  parentProps,
  maxDepth,
  currentDepth = 1
) => {
  if (currentDepth > maxDepth || children === undefined) return children;
  return React.Children.map(children, child => {
    if (typeof child !== "object" || child === null) return child;
    let addProps =
      child.props && child.props.assignProps
        ? { passdownprops: parentProps }
        : {};
    let newChildren = renderChildWithProps(
      child.props.children,
      parentProps,
      maxDepth,
      currentDepth + 1
    );
    return React.cloneElement(child, { ...addProps }, newChildren);
  });
};

export default ReduxFormTemplate;
