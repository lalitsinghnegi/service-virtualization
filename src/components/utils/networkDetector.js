import React from "react";
import { Detector, Online, Offline } from "react-detect-offline";
import config from "../config";
const API_URL = config.api.uri;

const pollingOptions = {
  url: `${API_URL}/actuator/health`,
  interval: 60000,
  timeout: 3000
};

export const DetectorComponent = ({ render }) => {
  return <Detector render={render} polling={pollingOptions} />;
};

export const OnlineComponent = ({ children }) => <Online>{children}</Online>;

export const OfflineComponent = ({ children }) => <Offline>{children}</Offline>;
