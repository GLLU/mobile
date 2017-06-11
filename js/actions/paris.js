export const SHOW_PARIS_BOTTOM_MESSAGE = 'SHOW_PARIS_BOTTOM_MESSAGE';
export const HIDE_PARIS_BOTTOM_MESSAGE = 'HIDE_PARIS_BOTTOM_MESSAGE';

export function showParisBottomMessage(message) {
  return {
    type: SHOW_PARIS_BOTTOM_MESSAGE,
    payload: message
  };
}

export function hideParisBottomMessage() {
  return {
    type: HIDE_PARIS_BOTTOM_MESSAGE,
  };
}
