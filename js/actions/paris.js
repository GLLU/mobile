export const SHOW_PARIS_BOTTOM_MESSAGE = 'SHOW_PARIS_BOTTOM_MESSAGE';
export const HIDE_PARIS_BOTTOM_MESSAGE = 'HIDE_PARIS_BOTTOM_MESSAGE';
// export const SHOW_PARIS_ADJUSTABLE_MESSAGE = 'SHOW_PARIS_ADJUSTABLE_MESSAGE';
// export const HIDE_PARIS_ADJUSTABLE_MESSAGE = 'HIDE_PARIS_ADJUSTABLE_MESSAGE';

export function showParisBottomMessage(message, time = 3) {
  const payload = {message, time}
  return {
    type: SHOW_PARIS_BOTTOM_MESSAGE,
    payload
  };
}

export function hideParisBottomMessage() {
  return {
    type: HIDE_PARIS_BOTTOM_MESSAGE,
  };
}
//
// export function showParisAdjustableMessage(message): Action {
//   return {
//     type: SHOW_PARIS_ADJUSTABLE_MESSAGE,
//     payload: message
//   };
// }
//
// export function hideParisAdjustableMessage(): Action {
//   return {
//     type: HIDE_PARIS_ADJUSTABLE_MESSAGE,
//   };
// }
