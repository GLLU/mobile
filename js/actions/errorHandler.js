import type { Action } from './types';

export const SHOW_ERROR = 'SHOW_ERROR';
export const HIDE_ERROR = 'HIDE_ERROR';
export const SHOW_WARNING = 'SHOW_WARNING';
export const HIDE_WARNING = 'HIDE_WARNING';
export const SHOW_INFO = 'SHOW_INFO';
export const HIDE_INFO = 'HIDE_INFO';

export function showError(err):Action {
  return {
    type: SHOW_ERROR,
    payload: err
  };
}

export function hideError():Action {
  return {
    type: HIDE_ERROR,
  };
}

export function showWarning(warn):Action {
  return {
    type: SHOW_WARNING,
    payload: warn
  };
}

export function hideWarning():Action {
  return {
    type: HIDE_WARNING,
  };
}

export function showInfo(info):Action {
  return {
    type: SHOW_INFO,
    payload: info
  };
}

export function hideInfo():Action {
  return {
    type: HIDE_INFO,
  };
}
