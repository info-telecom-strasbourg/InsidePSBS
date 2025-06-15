import type { ConfigContext, ExpoConfig } from "expo/config";

const VERSION = process.env.RELEASE_VERSION || "v0.0.0";

// Determine the app variant based on environment variables
const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "fr.its.insidepsbs.dev";
  }

  if (IS_PREVIEW) {
    return "fr.its.insidepsbs.preview";
  }

  return "fr.its.insidepsbs";
};

const getAppName = () => {
  if (IS_DEV) {
    return "InsidePSBS (Dev)";
  }

  if (IS_PREVIEW) {
    return "InsidePSBS (Preview)";
  }

  return "InsidePSBS";
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  jsEngine: "hermes",
  name: getAppName(),
  slug: "insidepsbs",
  version: VERSION.substring(1),
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "insidepsbs",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: getUniqueIdentifier(),
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    buildNumber: config.version,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/icon.png",
      backgroundColor: "#ffffff",
    },
    package: getUniqueIdentifier(),
    versionCode: 61,
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-font",
      {
        fonts: [
          "./assets/fonts/space-grotesk/SpaceGrotesk-regular.ttf",
          "./assets/fonts/space-grotesk/SpaceGrotesk-bold.ttf",
          "./assets/fonts/space-grotesk/SpaceGrotesk-medium.ttf",
          "./assets/fonts/space-grotesk/SpaceGrotesk-semibold.ttf",
          "./assets/fonts/space-grotesk/SpaceGrotesk-light.ttf",
        ],
      },
    ],
    "expo-secure-store",
    "expo-video",
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "61177b6a-7651-4fcf-8e36-b10e30374c5c",
    },
  },
  owner: "informatique-telecom-strasbourg",
});
