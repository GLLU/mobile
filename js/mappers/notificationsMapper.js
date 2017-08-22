import _ from 'lodash';
import * as userMapper from "./userMapper";

export function map(notification) {
  const {initiator,go_to_object} = notification;
  const cover = go_to_object.data ? go_to_object.data.cover : null

  return {
    ...notification,
    ...userMapper.map(initiator),
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
    default:
      return 'unrecognized action kind';
  }
}