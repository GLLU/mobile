// @flow

import { floorWithPrecision, formatNumberAsString } from '../FormatUtils';

describe('formatNumberAsString util', () => {

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
    expect(formatNumberAsString(1337)).toBe('1.3K');
  });

  test('4 digit number', () => {
    expect(formatNumberAsString(2017)).toBe('2K');
  });

  test('5 digit number', () => {
    expect(formatNumberAsString(11270)).toBe('11.2K');
  });

  test('5 digit number', () => {
    expect(formatNumberAsString(52048)).toBe('52K');
  });

  test('6 digit number', () => {
    expect(formatNumberAsString(123123)).toBe('123K');
  });

  test('7 digit number', () => {
    expect(formatNumberAsString(6000000)).toBe('6M');
  });
  test('7 digit number', () => {
    expect(formatNumberAsString(7560000)).toBe('7.5M');
  });
  test('8 digit number', () => {
    expect(formatNumberAsString(13371337)).toBe('13M');
  });
  test('9 digit number', () => {
    expect(formatNumberAsString(123456789)).toBe('123M');
  });
});

describe('floorWithPrecision util', () => {

  test('negative number with 0 precision', () => {
    expect(floorWithPrecision(-1024.349)).toBe(-1024);
  });

  test('negative number with 1 precision', () => {
    expect(floorWithPrecision(-25490.992812738,1)).toBe(-25490.9);
  });

  test('negative number with 2 precision', () => {
    expect(floorWithPrecision(-1440.134,2)).toBe(-1440.13);
  });

  test('zero with 2 precision', () => {
    expect(floorWithPrecision(0,2)).toBe(0);
  });

  test('positive number with 0 precision', () => {
    expect(floorWithPrecision(0.2048)).toBe(0);
  });

  test('positive number with 1 precision', () => {
    expect(floorWithPrecision(124.816,1)).toBe(124.8);
  });

  test('positive number with 2 precision', () => {
    expect(floorWithPrecision(123123.123,2)).toBe(123123.12);
  });

});
