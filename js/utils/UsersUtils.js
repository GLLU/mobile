// @flow

// export function getUsersById(usersIds: array, usersData: object) {
//   return _.map(usersIds, (lookId, index) => {
//     const look = usersData[lookId];
//     return look;
//   });
// }

export function getDataWithUsersObj(data: array, usersData: array, spreadUser = true) {
  return _.map(data, (item) => {
    const itemUserData = usersData[item.userId];
    const clonedUserData = _.cloneDeep(itemUserData);
    if (spreadUser) {
      delete clonedUserData.id;
      return { ...item, ...clonedUserData };
    } else {
      return { ...item, user: clonedUserData };
    }
  });
}

export function getFollowsWithUsersObj(followsData: array, usersData: array) {
  return _.map(followsData, (followee, index) => {
    const followeeUserData = usersData[followee.followeeId];
    const newLFollow = { ...followee, followee: followeeUserData, user: usersData[followee.userId] };
    return newLFollow;
  });
}

export function unifyUsers(newUsersData, stateUsersData) {
  const usersData = { ...newUsersData, ...stateUsersData };
  return usersData;
}
