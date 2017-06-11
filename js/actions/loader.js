export const SHOW_PROCESSING = 'SHOW_PROCESSING';
export const HIDE_PROCESSING = 'HIDE_PROCESSING';

export function showProcessing() {
  return {
    type: SHOW_PROCESSING,
  };
}

export function hideProcessing() {
  return {
    type: HIDE_PROCESSING,
  };
}
