import _ from 'lodash';
import * as userMapper from "./userMapper";

export function map(notification) {
  let clonedNotification = _.cloneDeep(notification)
  const {initiator,go_to_object} = clonedNotification;
  const cover = go_to_object.data ? go_to_object.data.cover : null
  const mappedInitiator = userMapper.map(initiator)
  delete clonedNotification.initiator
  if(clonedNotification.go_to_object.object === "User"){
    clonedNotification.go_to_object.data = userMapper.map(clonedNotification.go_to_object.data)
  }
  return {
    ...clonedNotification,
    initiator: mappedInitiator,
    id: notification.id,
    coverImage: cover ? _.find(cover.list, x => x.version === 'medium') : null,
    actionText: getTextByAction(notification.action_kind)
  };
}

function getTextByAction(actionKind) {
  switch (actionKind) {
    case 'Like':
      return 'liked your look';
    case 'Follow':
      return 'started following you';
    case 'Comment':
      return 'commented on your look';
    case 'Upload':
      return 'Your look is Ready';
    default:
      return 'unrecognized action kind';
  }
}