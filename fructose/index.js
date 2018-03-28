import { AppRegistry } from "react-native";
import Fructose from "@ap-rn-components/fructose";
// eslint-disable-next-line import/no-unresolved
import { loadStories } from "./components";

AppRegistry.registerComponent("storybooknative", () => Fructose(loadStories));
