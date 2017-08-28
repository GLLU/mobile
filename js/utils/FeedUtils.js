// @flow

export function getLooksById(feedLooksIds: array, flatLooksData: object) {
  return _.map(feedLooksIds, (lookId, index) => {
    const look = flatLooksData[lookId];
    look.originalIndex = index;
    return look;
  });
}

export function getLooksWithUsersObj(feedLooksData: array, usersData: array) {
  return _.map(feedLooksData, (look, index) => {
    const lookUserData = usersData[look.userId];
    delete lookUserData.id
    const newLook = {...look, ...lookUserData}
    return newLook;
  });
}

export function unifyLooks(newLooksData, stateLooksData) {
  const flatLooksData = { ...stateLooksData, ...newLooksData };
  return flatLooksData;
}