export const ADD_NEW_LOOK = 'ADD_NEW_LOOK';

// Actions
export function addNewLook(image) {
  return {
    type: ADD_NEW_LOOK,
    payload: {
      image: image
    }
  }
}
