// @flow

// export function getUsersById(usersIds: array, usersData: object) {
//   return _.map(usersIds, (lookId, index) => {
//     const look = usersData[lookId];
//     return look;
//   });
// }

export function getDataWithUsersObj(data: array, usersData: array) {
  return _.map(data, (item) => {
    return addUserObjToItem(item, usersData)
  });
}

export function addUserObjToItem(item: object, usersData: array) {
  const itemUserData = usersData[item.userId];
  const clonedUserData = _.cloneDeep(itemUserData);
  return { ...item, user: clonedUserData };
}

export function getFollowsWithUsersObj(followsData: array, usersData: array) {
  return _.map(followsData, (followee) => {
    const followeeUserData = usersData[followee.followeeId];
    const newLFollow = { ...followee, followee: followeeUserData, user: usersData[followee.userId] };
    return newLFollow;
  });
}

export function getNotificationsWithUsersObj(notificationsData: array, usersData: array) {
  return _.map(notificationsData, (notification) => {
    const initiatorUserData = usersData[notification.initiatorId];
    const newNotification = { ...notification, initiator: initiatorUserData };
    return newNotification;
  });
}

export function unifyUsers(newUsersData, stateUsersData) {
  const usersData = { ...newUsersData, ...stateUsersData };
  return usersData;
}
