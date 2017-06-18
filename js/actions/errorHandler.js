export const SHOW_ERROR = 'SHOW_ERROR';
export const HIDE_ERROR = 'HIDE_ERROR';
export const SHOW_FATAL_ERROR = 'SHOW_FATAL_ERROR';
export const HIDE_FATAL_ERROR = 'SHOW_FATAL_ERROR';
export const SHOW_WARNING = 'SHOW_WARNING';
export const HIDE_WARNING = 'HIDE_WARNING';
export const SHOW_INFO = 'SHOW_INFO';
export const HIDE_INFO = 'HIDE_INFO';

export function showError(err){
  return {
    type: SHOW_ERROR,
    payload: err
  };
}

export function hideError(){
  return {
    type: HIDE_ERROR,
  };
}

export function showFatalError(err){
  return {
    type: SHOW_FATAL_ERROR,
    payload: err
  };
}

export function hideFatalError(){
  return {
    type: HIDE_FATAL_ERROR,
  };
}

export function showWarning(warn){
  return {
    type: SHOW_WARNING,
    payload: warn
  };
}

export function hideWarning(){
  return {
    type: HIDE_WARNING,
  };
}

export function showInfo(info){
  return {
    type: SHOW_INFO,
    payload: info
  };
}

export function hideInfo(){
  return {
    type: HIDE_INFO,
  };
}
