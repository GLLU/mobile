// @flow

import * as _ from 'lodash';

export function getLooksById(feedLooksIds: array, flatLooksData: object) {
  return _.map(feedLooksIds, (lookId, index) => {
    const look = flatLooksData[lookId];
    look.originalIndex = index;
    return look;
  });
}

export const pushIdsRandomly = (originalIds: Array<number>, newIds: Array<number>) => {
  const newArray = [];
  const indexedIds = _.map(newIds, newId => ({ id: newId, index: _.random(originalIds.length) }));
  _.times(originalIds.length, (i) => {
    const newId = _.find(indexedIds, indexedId => i === indexedId.index);
    if (newId) {
      newArray.push(newId.id);
    }
    newArray.push(originalIds[i]);
  });
  return _.uniq(newArray);
};

export function unifyLooks(newLooksData, stateLooksData) {
  const flatLooksData = { ...stateLooksData, ...newLooksData };
  return flatLooksData;
}
