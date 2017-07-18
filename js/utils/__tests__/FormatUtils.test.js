// @flow

import { formatNumberAsString } from '../FormatUtils';

describe('fomatNumberAsString util', () => {

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
