import React from "react";
import DashboardCard from "./DashboardCard";

export const RequestAccessCard = (props) => (
  <DashboardCard
    title={"Request Access"}
    subtitle="Get access to another stream."
    icon=""
    color="green"
   // to="accessManagement"{...props}
  />
);

export default RequestAccessCard;
