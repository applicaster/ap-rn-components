import { View } from "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import { CenteredDecorator } from "@ap-rn-components/storybook";
import Link, { TextLink } from "./link";

const BigSquare = props => (
  <View
    style={{
      width: 100,
      height: 100,
      backgroundColor: "grey"
    }}
    {...props}
  />
);

storiesOf("Primitives/Link", module)
  .addDecorator(CenteredDecorator)
  .add("Link with big content", () => (
    <Link url="https://thetimes.co.uk" onPress={action("onPress")}>
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: "grey"
        }}
      />
    </Link>
  ))
  .add("Link can prevent browser navigation", () => (
    <Link
      url="https://thetimes.co.uk"
      onPress={e => {
        e.preventDefault();
        action("onPress")(e);
      }}
    >
      <BigSquare />
    </Link>
  ))
  .add("TextLink", () => (
    <TextLink url="https://thetimes.co.uk/" onPress={action("onPress")}>
      The Times
    </TextLink>
  ))
  .add("TextLink with styles", () => (
    <TextLink
      style={{ color: "grey" }}
      url="https://thetimes.co.uk/"
      onPress={action("onPress")}
    >
      The Times
    </TextLink>
  ));
