import url from "url";
import { AppRegistry, NativeModules, Platform } from "react-native";
import {
  getStorybookUI,
  configure,
  addDecorator
} from "@storybook/react-native";
import { withKnobs } from '@storybook/addon-knobs';
import { BarSpacingDecorator, WhiteBgColorDecorator } from "@ap-rn-components/storybook";
import { loadStories } from "./story-loader";

if (Platform.OS === "ios") {
  addDecorator(BarSpacingDecorator);
}

if (Platform.OS === "android") {
  addDecorator(WhiteBgColorDecorator);
}

addDecorator(withKnobs);

configure(loadStories, module);

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);

const StorybookUI = getStorybookUI({
  port: 7007,
  host: hostname
});

AppRegistry.registerComponent("storybooknative", () => StorybookUI);
