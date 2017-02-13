import type { Action } from './types';

export const SHOW_ERROR = 'SHOW_ERROR';
export const HIDE_ERROR = 'HIDE_ERROR';
export const SHOW_WARNING = 'SHOW_WARNING';
export const HIDE_WARNING = 'HIDE_WARNING';

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
