import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn, getRole } from "../services/authentication";
import { Container } from "reactstrap";
import HeaderNav from "../components/common/Header/HeaderNav";
const PrivateRoute = ({ component: Component, ...rest }) => {
 
// Purpose : For normal user we are using this layout 


  let role;
  const isAuthenticated = isLoggedIn();
  if(isAuthenticated){
  role = getRole();
  }
  const renderSwitch = (props,role) => {

   

    switch (role) {
      case "user":
        return <Component {...props} {...rest} />;
      case "support":
        return (
            <Redirect
              to={{
                pathname: "/support/dashboard",
                state: {
                  from: props.location,
                },
              }}
            />
          );
      default:
        return (
          <Redirect
            to={{
              pathname: "/signin",
              state: {
                from: props.location,
              },
            }}
          />
        );
    }
  };

  return (
    <>
      <HeaderNav></HeaderNav>
      <Container
        id="main-content"
        style={{ marginTop: "1%", marginBottom: "1%" }}
      >
        <Route
          {...rest}
          render={(props) =>
            isAuthenticated ? (
              renderSwitch(props,role)
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
      </Container>
    </>
  );
};

export default PrivateRoute;
