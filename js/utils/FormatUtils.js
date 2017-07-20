// @flow

import * as selfRef from './FormatUtils'
import * as _ from "lodash";

export default selfRef

export const format_measurement = (value, measurements_scale) => `${format_number(value)} ${measurements_scale}`;

export const format_number = (value) => Math.round(value * 100) / 100;

export const formatNumberAsString = (value: number) => {
  if(value < 0 || value!==0 && !value){
    return 'N/A';
  }
  if(value<1000){
    return `${value}`
  }
  if(value<100000){
    return `${Math.floor(value/100)/10}K`
  }
  if(value<1000000){
    return `${Math.floor(value/1000)}K`
  }
  if(value<10000000){
    return `${Math.floor(value/100000)/10}M`
  }
  else {
    return `${Math.floor(value/1000000)}M`
  }
};