export const BODY_TYPE_CHANGE_SLIDING = 'BODY_TYPE_CHANGE_SLIDING'
export const BODY_TYPE_SHOW_MODAL = 'BODY_TYPE_SHOW_MODAL'
export const BODY_TYPE_HIDE_MODAL = 'BODY_TYPE_HIDE_MODAL'
export const GET_CURRENT_USER_BODY_TYPE = 'GET_CURRENT_USER_BODY_TYPE'

// Actions
export function changeBodyType(data) {
  return {
    type: BODY_TYPE_CHANGE_SLIDING,
    payload: data
  }
}

export function showBodyTypeModal() {
  return {
    type: BODY_TYPE_SHOW_MODAL
  }
}

export function hideBodyTypeModal() {
  return {
    type: BODY_TYPE_HIDE_MODAL
  }
}

export function getUserBodyType(data) {
  return {
    type: GET_CURRENT_USER_BODY_TYPE,
    payload: data
  }
}