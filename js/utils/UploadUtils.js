// @flow
import { Platform } from 'react-native';
import base64 from 'base-64';
import RNFS from 'react-native-fs';
import uploadLookService from '../services/uploadLookService';

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

export function mapTagsData(tagsData) {
  return tagsData.map(function(tag, i) {
    return {
      cover_x_pos: tag.cover_x_pos,
      cover_y_pos: tag.cover_y_pos,
      category: tag.category,
      offers: tag.offers,
      id: (i + 100),
      isCustom: false,
      offersLink: tag.offersLink,
    };
  });
}

export function convertDataURIToBinary(base64File) {
  const raw = base64.decode(base64File);
  const rawLength = raw.length;
  let array = new Uint8Array(new ArrayBuffer(rawLength));

  for(i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

export function getSuggestion(image, dispatch, resolve) {
  return new Promise((innerResolve, reject) => {
    RNFS.readFile(image.localPath, 'base64')
  .then((readFile) => {
    const binaryFile = convertDataURIToBinary(readFile);
    uploadLookService.getLookSuggestions(binaryFile).then((data) => {
      innerResolve(data);
      resolve(data);
    }).catch(() => {
      reject('error retrieving suggestions');
    });
  })
  .catch((err) => {
    // scan file error
  });
  });
}

function _mapItemsForAnalytics(items, type) {
  const joinedArray = _.map(items, (item) => {
    if (type === 'color_ids' || type === 'occasions') {
      return (item[type] && item[type].length > 0) ? true : null;
    }
    return item[type] && item[type] !== -1 ? item[type] : null;
  });
  return joinedArray;
}

export function logUploadLookEvent(logEvent, eventName, items, description, origin) {
  logEvent('uploadLook', {
    name: eventName,
    category: _mapItemsForAnalytics('category'),
    brand: _mapItemsForAnalytics('brand'),
    origin,
    colors: _mapItemsForAnalytics('color_ids'),
    occasions: _mapItemsForAnalytics('occasions'),
    description,
    link: _mapItemsForAnalytics('url'),
    items: items.length,
  });
}
