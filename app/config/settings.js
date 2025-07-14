import { Constants } from "expo-constants";

const settings = {
  dev: {
    apiUrl: "https://192.168.0.14:9000/api",
  },
  staging: {
    apiUrl: "https://192.168.0.14:9000/api",
  },
  prod: {
    apiUrl: "https://192.168.0.14:9000/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  else return settings.prod;
};

export default getCurrentSettings();
