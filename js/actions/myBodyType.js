export const BODY_TYPE_CHANGE_SLIDING = 'BODY_TYPE_CHANGE_SLIDING'
export const BODY_TYPE_SHOW_MODAL = 'BODY_TYPE_SHOW_MODAL'
export const BODY_TYPE_HIDE_MODAL = 'BODY_TYPE_HIDE_MODAL'

// Actions
export function changeBodyType(index) {
  return {
    type: BODY_TYPE_CHANGE_SLIDING,
    payload: {
      selectedIndex: index
    }
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