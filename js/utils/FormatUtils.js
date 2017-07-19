// @flow

import * as selfRef from './FormatUtils'
import * as _ from "lodash";

export default selfRef

export const format_measurement = (value, measurements_scale) => `${format_number(value)} ${measurements_scale}`;

export const format_number = (value) => Math.round(value * 100) / 100;

const formatNumberAsStringConfig=[
  {
    length:6,
    suffix:'M'
  },
  {
    length:3,
    suffix:'K'
  }
];

export const formatNumberAsString = (value: number,config=formatNumberAsStringConfig) => {
  if(value < 0 || value!==0 && !value){
    return 'N/A';
  }
  const stringValue = value.toString();
  const entry=_.chain(config)
    .filter(entry=>stringValue.length > entry.length)
    .maxBy(entry=>entry.length)
    .value();
  return entry ? Math.round(value / Math.pow(10, entry.length)) + entry.suffix : stringValue;
};