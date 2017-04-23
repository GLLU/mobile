
export function notificationMapper(notification) {
  console.log('fullnotification', notification)
  return {
    id: notification.id,
    created_at: notification.created_at,
    user_id: notification.initiator.id,
    avatar: notification.initiator.avatar,
    name: notification.initiator.name,
    username: notification.initiator.username,
    is_read: notification.is_read,
    go_to_object: notification.go_to_object,
    action_kind: notification.action_kind,
    actionText: getTextByAction(notification.action_kind)
  };
}

function getTextByAction(actionKind) {
  console.log(actionKind)
  switch (actionKind) {
    case 'Like': {
      return 'liked your look'
      break;
    }
    case 'Follow': {
      return 'started following you'
      break;
    }
    case 'Comment': {
      return 'commented on your look'
      break;
    }
    default:
      return 'unrecognized action kind'
      break;

  }
}