// @flow

import * as selfRef from './FormatUtils'
import * as _ from "lodash";

export default selfRef

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

export const formatNumberAsAmount = (value: number) => {
  const moneyParts = value.toString().split('.');
  let dolars = moneyParts[0];
  let cents = '0';
  if (parseInt(moneyParts[0]) < 10){
    dolars = `${moneyParts[0]}`;
  }
  debugger;
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