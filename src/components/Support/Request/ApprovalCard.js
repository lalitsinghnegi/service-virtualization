import React from "react";
import DashboardCard from "../../DashboardNew/Cards/DashboardCard";

export const ApprovalCard = (props) => (
  <DashboardCard
    title={"Approvals"}
    subtitle="Approve or reject a request."
    icon=""
    color="green"
    to="adminapproval"{...props}
  />
);

export default ApprovalCard;
