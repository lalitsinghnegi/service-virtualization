import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn, getRole } from "../services/authentication";
import PropTypes from "prop-types";
export const RouteWithLayout = (props) => {

// Purpose : For a support / Admin we wre using this layout with authontication

  const isAuthenticated = isLoggedIn();
  let role;
  if(isAuthenticated){
  role = getRole();
  }
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <div
      className=" "
      style={{
        width: "100%",
        height: "100%",
        marginTop: "0%",
        marginLeft: "0%",
      }}
    >
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            role === "support" ? (
              <Layout>
                <Component {...props} {...rest} />
              </Layout>
            ) : (
              <Redirect
              to={{
                pathname: "/dashboard",
                state: {
                  from: props.location,
                },
              }}
            />
            )
          ) : (
            <Redirect
              to={{
                pathname: "/expired",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    </div>
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default RouteWithLayout;
