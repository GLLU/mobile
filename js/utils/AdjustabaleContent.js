/**
 * Created by martin on 10/06/2017.
 */
import { Dimensions, Text, StyleSheet } from 'react-native';
import React, { PropTypes } from 'react';

const { width, height } = Dimensions.get('window');
const flattenStyle = StyleSheet.flatten;
const realWidth = height > width ? width : height;


export function generateAdjustedSize(fontSize: number): number {
  return parseInt(fontSize) * width / 400;
}


const ScalableText = ({ style, children, ...props }) => {
  const fontSize = flattenStyle(style).fontSize || 14;
  const scaledFontSize = generateAdjustedSize(fontSize);

  return (
    <Text numberOfLines={2} style={[style, { fontSize: scaledFontSize }]} {...props}>
      {children}
    </Text>
  );
};

ScalableText.propTypes = {
  style: Text.propTypes.style,
  children: PropTypes.node.isRequired,
};

ScalableText.defaultProps = {
  style: {},
};

export default ScalableText;

