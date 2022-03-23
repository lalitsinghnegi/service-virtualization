import React from "react";

export const getStartsWithIcon = label => {
  if (label == null) return null;
  if (label.startsWith("BYO")) return "icon-sim-card";
  if (label.contains("Products")) return "icon-shop-online";
  return null;
};

export const getKeyIcon = key => {
  switch (key) {
    case "envType":
      return "icon-home";
    default:
      return "icon-internet";
  }
};

export const getIcon = (label, key) => {
  switch (label) {
    case "NBN":
      return "icon-network-coverage";
    case "Cable":
      return "icon-modem";
    case "Mobile":
      return "icon-mobile";
    case "Postpaid":
      return "icon-mobile";
    case "Prepaid":
      return "icon-mobile";
    case "ADSL":
      return "icon-internet";
    case "Customer":
      return "icon-my-profile";
    case "Order":
      return "icon-shop-online";
    case "Transition":
      return "icon-network-australia-wide";
    case "FTTP":
      return "icon-home";
    case "FTTN":
      return "icon-network-australia-wide";
    case "FTTB":
      return "icon-business-building";
    case "FTTN/B":
      return "icon-business-building";
    case "FTTC":
      return "icon-road-map";
    case "FW":
      return "icon-wireless-access-point";
    case "Residential":
      return "icon-home";
    case "Sole Trader":
      return "icon-profile-suit";
    case "Company":
      return "icon-industries";
    case "Organisation":
      return "icon-business-building";
    case "Existing":
      return "icon-hosted-server-pos-old";
    case "Legacy":
      return "icon-software-apps";
    case "Realtime":
      return "icon-network-australia-wide";
    case "Site":
      return "icon-business-building";
    case "Billing Account":
      return "icon-bill-paper";
    case "Contact":
      return "icon-profile-suit";
    case "Opportunity":
      return "icon-bundle";
    case "Sync":
      return "icon-file-sharing";
    case "Draft":
      return "icon-file-sharing";
    case "Commercial Configuration":
      return "icon-shop-online";
    case "Quote":
      return "icon-payroll";
    case "Contract Initiated":
      return "icon-timesheets";
    case "Contract Accepted":
      return "icon-receipt-management";
    case "Enrichment":
      return "icon-sip-connect";
    case "Closed Won":
      return "icon-special-offer";
    case "Benchmark":
      return "icon-wan-accelerate";
    case "Chaos":
      return "icon-unlimited-users";
    case "Socialised":
      return "icon-chat-forums";
    case "Scalability":
      return "icon-application-ngdr";
    case "Mock Delay":
      return "icon-time";
    case "Shakeout":
      return "icon-wireless-router";
    case "Linear":
      return "icon-road-map";
    case "API":
      return "icon-technologies2";
    case "UI":
      return "icon-design";
    case "Kinesis":
      return "icon-network-australia-wide";
    case "MyTelstra":
      return "icon-telstra";
    case "SFDC":
      return "icon-cloud";
    case "eCommerce":
      return "icon-shop-online";
    case "Agent Console":
      return "icon-software-apps";
    case "XOM - Velocity":
      return "icon-modem";
    default:
      return getStartsWithIcon(label)
        ? getStartsWithIcon(label)
        : getKeyIcon(key);
  }
};

export const getDataTypeIcon = label => {
  return getIcon(label);
};

export const getClassTypeIcon = label => {
  return getIcon(label);
};

export const getNumberIcon = num => {
  switch (num) {
    case "1":
      return "icon-number-one";
    case "2":
      return "icon-number-two";
    case "3":
      return "icon-number-three";
    case "4":
      return "icon-number-four";
    case "5":
      return "icon-number-five";
    case "6":
      return "icon-number-six";
    case "7":
      return "icon-number-seven";
    case "8":
      return "icon-number-eight";
    case "9":
      return "icon-number-nine";
    case "10":
      return "icon-number-ten";
    default:
      return null;
  }
};

export const getColor = label => {
  if (label.startsWith("Customer")) return "turquoise";
  if (label.startsWith("Address")) return "blue";
  if (label.startsWith("Mobile")) return "orange";
  return "orange";
};

export const renderIcon = (icon, classes) => {
  return (
    <React.Fragment>
      <i className={`td-icon-sm ${icon} theme-text-primary ${classes}`} />
      {"  "}
    </React.Fragment>
  );
};

const calcResizeRenderQty = len => 30 - (len - 1) * 3.8; // 3.8 Seems to be the ideal scale factor

export const renderQtyIcon = qty => (
  <div
    id="custom-count-circle"
    data-value={qty}
    style={{ fontSize: `${calcResizeRenderQty(`${qty}`.length)}px` }}
  ></div>
);

export const flexStyles = {
  display: "inline-flex",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
  padding: "5px"
};

export const flexStylesNoPadding = {
  ...flexStyles,
  padding: "0"
};

export const flexStylesAround = {
  ...flexStyles,
  justifyContent: "space-around"
};

export const flexStylesCenter = {
  ...flexStyles,
  justifyContent: "center"
};

export const flexStylesStart = {
  ...flexStyles,
  justifyContent: "flex-start"
};

export const flexStylesColumn = {
  ...flexStyles,
  flexDirection: "column"
};

export const flexStylesNoWidth = {
  ...flexStyles,
  width: "unset"
};
