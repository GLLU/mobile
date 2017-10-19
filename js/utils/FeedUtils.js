// @flow

import * as _ from 'lodash';

export function getLooksById(feedLooksIds: array, flatLooksData: object) {
  const filteredLooks = _.map(feedLooksIds, (lookId, index) => {
    const look = flatLooksData[lookId];
    if (look) {
      look.originalIndex = index;
      return look;
    }
  });

  return filteredLooks.filter(function (currLook) {
    return currLook != undefined;
  });
}

export function unifyLooks(newLooksData, stateLooksData) {
  const flatLooksData = { ...stateLooksData, ...newLooksData };
  return flatLooksData;
}
