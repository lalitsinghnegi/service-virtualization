import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import SignIn from "../components/SignIn/SignIn";
import DashboardNew from "../components/DashboardNew/DashboardNew";

import Health from "../components/Health/Health";
import VirtualServiceDetails from "../components/Monitor/VirtualServiceDetail";
import Register from "../components/SignIn/Register";
import PortalInsights from "../components/Support/PortalInsights/PortalInsights";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Monitor from "../components/Monitor/Monitor";
import Create from "../components/Create/Create";
import Simulations from "../components/ManageStub/Simulations";
import EditSimulation from "../components/ManageStub/EditSimulation";
import ChangePassword from "../components/SignIn/ChangePassword";
import Users from "../components/Support/UserManagement/Users";
import CreateUser from "../components/Support/UserManagement/CreateUser";
import Notfound from "../components/common/custom/notfound";
import Expired from "../components/common/custom/expired";
import SupportDashboard from "../components/Support/Dashboard/SupportDashboard";
import Main from "../components/Support/Layouts/Main";
import RouteWithLayout from "./RouteWithLayout";
import ApplicationsStructure from "../components/FolderStructure/ApplicationsStructure";
import AdminApproval from "../components/Support/Request/AdminApproval";
import AccessManagement from "../components/Support/AccessManagement/AccessManagement";
export default function index() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/expired" component={Expired} />
        <PublicRoute exact path="/unauthorized" component={Notfound} />
        <Redirect exact from="/" to="/signin" component={SignIn} />
        <PublicRoute exact path="/signin" component={SignIn} />
        <PublicRoute exact path="/register" component={Register} />

        <PrivateRoute exact path="/changepass" component={ChangePassword} />
        <PrivateRoute exact path="/health" component={Health} />
        <PrivateRoute exact path="/managestub/createstub" component={Create} />
        <PrivateRoute exact path="/createstub" component={Create} />
        <PrivateRoute exact path="/monitor" component={Monitor} />

        <PrivateRoute
          exact
          path="/virtualServiceDetails/:port/:name"
          component={VirtualServiceDetails}
        ></PrivateRoute>

        <PrivateRoute
          exact
          path="/managestub/managestub"
          component={Simulations}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/managestub"
          component={Simulations}
        ></PrivateRoute>

        <PrivateRoute
          exact
          path="/managestub/editstub"
          component={EditSimulation}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/dashboard"
          component={DashboardNew}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/applications"
          component={ApplicationsStructure}
        ></PrivateRoute>

        <RouteWithLayout
          exact
          layout={Main}
          path="/support/insights"
          component={PortalInsights}
        ></RouteWithLayout>

        <RouteWithLayout
          exact
          layout={Main}
          path="/support/applications"
          component={ApplicationsStructure}
        ></RouteWithLayout>

        <RouteWithLayout
          component={ChangePassword}
          exact
          layout={Main}
          path="/support/changepass"
        />
        <RouteWithLayout
          component={Create}
          exact
          layout={Main}
          path="/support/createstub"
        />
        <RouteWithLayout
          path="/support/managestub"
          component={Simulations}
          exact
          layout={Main}
        />
        <RouteWithLayout
          path="/support/managestub/editstub"
          component={EditSimulation}
          exact
          layout={Main}
        ></RouteWithLayout>
        <RouteWithLayout
          component={CreateUser}
          exact
          layout={Main}
          path="/support/createuser"
        />

        <RouteWithLayout
          component={Users}
          exact
          layout={Main}
          path="/support/users"
        />
        <RouteWithLayout
          component={SupportDashboard}
          exact
          layout={Main}
          path="/support/dashboard"
        />
        <RouteWithLayout
          component={AdminApproval}
          exact
          layout={Main}
          path="/support/adminapproval"
        />
        <RouteWithLayout
          component={AccessManagement}
          exact
          layout={Main}
          path="/support/accessManagement"
        />
      </Switch>
    </BrowserRouter>
  );
}
