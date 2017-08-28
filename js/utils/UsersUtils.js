// @flow

export function getUsersById(usersIds: array, usersData: object) {
  return _.map(usersIds, (lookId, index) => {
    const look = usersData[lookId];
    return look;
  });
}

export function unifyUsers(newUsersData, stateUsersData) {
  const usersData = { ...newUsersData, ...stateUsersData };
  return usersData;
}