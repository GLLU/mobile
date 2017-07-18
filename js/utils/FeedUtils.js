// @flow

export function getLooksById(feedLooksIds: array, flatLooksData: object) {
  return _.map(feedLooksIds, (lookId, index) => {
    const look = flatLooksData[lookId];
    look.originalIndex = index;
    return look;
  });
}

export function unifyLooks(newLooksData, stateLooksData) {
  const flatLooksData = { ...stateLooksData, ...newLooksData };
  return flatLooksData;
}