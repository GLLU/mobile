export default class FormatUtils {
  static format_measurement(value, measurements_scale) {
    return `${FormatUtils.format_number(value)} ${measurements_scale}`;
  }

  static format_number(value) {
    return Math.round(value * 100)/ 100;
  }
}