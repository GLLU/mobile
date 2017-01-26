import type { Action } from './types';

export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';

export function showLoader():Action {
  return {
    type: SHOW_LOADER,
  };
}

export function hideLoader():Action {
  return {
    type: HIDE_LOADER,
  };
}
