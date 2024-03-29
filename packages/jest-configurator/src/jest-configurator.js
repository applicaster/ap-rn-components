// @flow

import findNodeModules from "find-node-modules";

import path from "path";
import getCoveragePaths from "./coverage";

export type Platform = "android" | "ios" | "web";

const nativeSpecific = (platform: Platform) => ({
  haste: {
    defaultPlatform: platform,
    platforms: [platform],
    providesModuleNodeModules: ["react", "react-native"],
    moduleFileExtensions: [`${platform}.js`, "native.js", "js", "json"]
  }
});

const webSpecific = {
  moduleNameMapper: {
    "react-native": "react-native-web"
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["web.js", "js", "json"]
};

const platformIndependentSpecific = {
  moduleFileExtensions: ["js", "json"]
};

const platformCode = platform => {
  switch (platform) {
    case "web":
      return webSpecific;
    case "ios":
      return nativeSpecific("ios");
    case "android":
      return nativeSpecific("android");
    default:
      return platformIndependentSpecific;
  }
};

export default (
  platform: Platform,
  cwd: string,
  coverageIgnoreGlobs: Array<string>
) => {
  const [local, global] = findNodeModules(cwd);
  const module = path.resolve(cwd, local.replace("node_modules", ""));
  const rootDir = path.resolve(
    cwd,
    (global || local).replace("node_modules", "")
  );

  const platformPath = platform ? `${platform}/` : "";

  return {
    preset: "react-native",
    ...platformCode(platform),
    rootDir,
    transformIgnorePatterns: [
      "node_modules/(?!(react-native|react-native-linear-gradient|@ap-rn-components)/)"
    ],
    coverageDirectory: `${module}/coverage/${platformPath}`,
    collectCoverageFrom: getCoveragePaths(
      rootDir,
      module,
      platform,
      coverageIgnoreGlobs
    ),
    testMatch: [`${module}/__tests__/${platformPath}*.test.js`],
    testPathIgnorePatterns: [
      `${module}/__tests__/${platformPath}jest.config.js`
    ],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    setupFiles: [
      path.resolve(__dirname, "../setup-jest.js"),
      "jest-plugin-context/setup"
    ]
  };
};
