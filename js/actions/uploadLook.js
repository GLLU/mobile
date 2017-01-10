export const ADD_NEW_LOOK = 'ADD_NEW_LOOK';
export const EDIT_TAG = 'EDIT_TAG';
export const ADD_TAG = 'ADD_TAG';

// Actions
export function addNewLook(image) {
  return {
    type: ADD_NEW_LOOK,
    payload: {
      image: image
    }
  }
}

export function editTag(editingTagIndex) {
  return {
    type: EDIT_TAG,
    payload: {
      editingTagIndex
    }
  }
}

export function addTag(tag) {
  return {
    type: ADD_TAG,
    payload: {
      tag,
    }
  }
}
