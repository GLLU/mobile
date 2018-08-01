// @flow

import * as _ from 'lodash';
import * as selfRef from './FormatUtils';

export default selfRef;

export const format_measurement = (value, measurements_scale) => `${format_number(value)} ${measurements_scale}`;

export const format_number = (value) => Math.round(value * 100) / 100;

export const floorWithPrecision = (number: number, precision: number = 0) => {
  if (number) {
    const devisionFactor = Math.pow(10, precision);
    return number > 0 ?
      Math.floor(number * devisionFactor) / devisionFactor :
      Math.ceil(number * devisionFactor) / devisionFactor;
  }
  else {
    return number;
  }
};

export const hexToRgb = (value: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  value = value.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
  return result ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})` : null;
}

export const formatNumberAsAmount = (value: number) => {
  const moneyParts = value.toString().split('.');
  let dolars = moneyParts[0];
  let cents = '0';
  if (parseInt(moneyParts[0]) < 10){
    dolars = `${moneyParts[0]}`;
  }
  if (parseInt(moneyParts[1]) < 10){
    cents = `${moneyParts[1]}0`;
  }

  return `${dolars}.${cents} US$`;
}

export const formatNumberAsString = (value: number) => {
  if (value < 0 || value !== 0 && !value) {
    return 'N/A';
  }
  if (value < 1000) {
    return `${value}`
  }
  if (value < 100000) {
    return `${floorWithPrecision(value / 1000, 1)}K`
  }
  if (value < 1000000) {
    return `${Math.floor(value / 1000)}K`
  }
  if (value < 10000000) {
    return `${floorWithPrecision(value / 1000000, 1)}M`
  }
  else {
    return `${Math.floor(value / 1000000)}M`
  }
};

export const formatPrice = (price, percision = 2) => {
  let formattedPrice = Math.round(price * 2) / 2;
  if (formattedPrice !== Math.round(formattedPrice)) {
    formattedPrice = formattedPrice.toFixed(percision);
  }
  return price ? `${formattedPrice}$` : 'N/A';
};

export const textEllipsis = (text, textLength = 20, subStrLen = 10) => {
  return text.length > textLength ? `${text.substr(0, subStrLen)}...` : text;
};
