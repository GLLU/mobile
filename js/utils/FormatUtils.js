import * as selfRef from './FormatUtils'

export default selfRef

export const format_measurement = (value, measurements_scale) => `${format_number(value)} ${measurements_scale}`;

export const format_number = (value) => Math.round(value * 100) / 100;