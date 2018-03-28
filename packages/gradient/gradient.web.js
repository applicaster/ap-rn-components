import PropTypes from "prop-types";
import React from "react";
import { View, ViewPropTypes } from "react-native";

const { style: ViewPropTypesStyle } = ViewPropTypes;

const Gradient = ({ degrees, startColor, endColor, children, style }) => (
  <View
    style={[
      {
        backgroundImage: `linear-gradient(${degrees}deg, ${startColor} 0%, ${
          endColor
        } 100%)`
      },
      style
    ]}
  >
    {children}
  </View>
);

Gradient.defaultProps = {
  degrees: 265,
  startColor: "white",
  endColor: "grey",
  children: null,
  style: null
};

Gradient.propTypes = {
  degrees: PropTypes.number,
  startColor: PropTypes.string,
  endColor: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  style: ViewPropTypesStyle
};

export default Gradient;
