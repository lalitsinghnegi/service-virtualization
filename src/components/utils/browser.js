import config from "../config";

export const setTitle = section => {
  document.title = `${config.title} ${section ? `- ${section}` : ""}`;
};
