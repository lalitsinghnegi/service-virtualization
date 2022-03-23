import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from "reactstrap";
import PublicHeaderNav from "../components/common/Header/PublicHeaderNav";

// Purpose : For unregistered user we are using this layout


const PublicRoute = ({
    component: Component,
    ...rest
}) => {
    return (
        <>
         <PublicHeaderNav></PublicHeaderNav>
        <Container id="main-content" style={{ marginTop: "1%" , marginBottom: "1%"}}>
        <Route
            {...rest}
            render={props =>
                    <Component {...props} {...rest} />
                }
        />
        </Container>
        </>
    );
}

export default PublicRoute;
