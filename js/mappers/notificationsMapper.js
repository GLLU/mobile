import _ from 'lodash';

export function notificationMapper(notification) {
  const cover = notification.go_to_object.data.cover ? notification.go_to_object.data.cover : null
  const {initiator} = notification;
  return {
    id: notification.id,
    created_at: notification.created_at,
    is_read: notification.is_read,
    go_to_object: notification.go_to_object,
    coverImage: cover ? _.find(cover.list, x => x.version === 'medium') : null,
    user_id: initiator.id,
    avatar: initiator.avatar,
    name: initiator.name,
    username: initiator.username,
    action_kind: notification.action_kind,
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