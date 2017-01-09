export const ADD_NEW_LOOK = 'ADD_NEW_LOOK';

// Actions
export function addNewLook(imagePath) {
  return {
    type: ADD_NEW_LOOK,
    payload: {
      imagePath: imagePath
    }
  }
}
