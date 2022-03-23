import React from "react";
import DashboardCard from "../../DashboardNew/Cards/DashboardCard";

export const PortalInsightsCard = ({ name }) => (
  <DashboardCard
    title={"Portal Insights"}
    subtitle="View portal metrics"
    // icon="settings"
    color="green"
    to="insights"
  ></DashboardCard>
);

export default PortalInsightsCard;
