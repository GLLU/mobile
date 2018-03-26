// @flow
import { Platform } from 'react-native';

export function formatAvatar(path: string): any {

  if (path) {
    const formattedPath = Platform.OS === 'ios' ? path.replace('file://', '') : path;

    return {
      path: formattedPath,
      type: 'multipart/form-data',
    };
  }
}

export function formatLook(path: string): any {
  if (path) {
    const formattedPath = path.replace('file://', '');
    return {
      type: path.search('.mp4') > -1 ? 'look[video]' : 'look[image]',
      localPath: path,
      path: formattedPath,
    };
  }
}

export function removeMultipleItemIndex(suggestionArray) {
  let indexToRemove = _findMultipleItemIndex(suggestionArray, 'shoes');
  if (indexToRemove !== -1) {
    suggestionArray.splice(indexToRemove, 1);
  }
  indexToRemove = _findMultipleItemIndex(suggestionArray, 'boots');
  if (indexToRemove !== -1) {
    suggestionArray.splice(indexToRemove, 1);
  }
}

function _findMultipleItemIndex(itemsArray, categoryName) {
  let count = 0;
  let lastIndex = -1;
  for (let index = 0; index < itemsArray.length; index++) {
    const category = itemsArray[index].label;
    if (category && (category.toLowerCase() === categoryName)) {
      count += 1;
    }
    if (count > 1 && lastIndex === -1) {
      lastIndex = index;
    }
  }
	return lastIndex;
}

export function convertDataURIToBinary(base64) {
  const raw = window.atob(base64);
  const rawLength = raw.length;
  let array = new Uint8Array(new ArrayBuffer(rawLength));

  for(i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}
