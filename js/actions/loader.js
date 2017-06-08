import type { Action } from './types';

export const SHOW_PROCESSING = 'SHOW_PROCESSING';
export const HIDE_PROCESSING = 'HIDE_PROCESSING';

export function showProcessing():Action {
  return {
    type: SHOW_PROCESSING,
  };
}

export function hideProcessing():Action {
  return {
    type: HIDE_PROCESSING,
  };
}
