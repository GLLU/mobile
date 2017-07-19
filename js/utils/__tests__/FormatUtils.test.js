// @flow

import { formatNumberAsString } from '../FormatUtils';

describe('fomatNumberAsString util', () => {

  test('null', () => {
    expect(formatNumberAsString(null)).toBe('N/A');
  });

  test('undefined', () => {
    expect(formatNumberAsString(undefined)).toBe('N/A');
  });

  test('empty string', () => {
    expect(formatNumberAsString('')).toBe('N/A');
  });

  test('negative one digit number', () => {
    expect(formatNumberAsString(-1)).toBe('N/A');
  });

  test('negative 4 digit number', () => {
    expect(formatNumberAsString(-1440)).toBe('N/A');
  });

  test('negative 5 digit number', () => {
    expect(formatNumberAsString(-18750)).toBe('N/A');
  });

  test('negative 6 digit number', () => {
    expect(formatNumberAsString(-321897)).toBe('N/A');
  });

  test('negative 7 digit number', () => {
    expect(formatNumberAsString(-6530289)).toBe('N/A');
  });

  test('zero', () => {
    expect(formatNumberAsString(0)).toBe('0');
  });

  test('one digit number', () => {
    expect(formatNumberAsString(9)).toBe('9');
  });

  test('4 digit number', () => {
    expect(formatNumberAsString(1337)).toBe('1K');
  });

  test('5 digit number', () => {
    expect(formatNumberAsString(11270)).toBe('11K');
  });

  test('6 digit number', () => {
    expect(formatNumberAsString(123123)).toBe('123K');
  });

  test('7 digit number', () => {
    expect(formatNumberAsString(6000000)).toBe('6M');
  });
  test('8 digit number', () => {
    expect(formatNumberAsString(13371337)).toBe('13M');
  });
  test('9 digit number', () => {
    expect(formatNumberAsString(123456789)).toBe('123M');
  });
});
