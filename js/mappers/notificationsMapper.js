import _ from 'lodash';
import * as userMapper from "./userMapper";
import i18n from 'react-native-i18n';

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
    actionText: getTextByAction(notification.action_kind, notification.text)
  };
}

function getTextByAction(actionKind, text) {
  switch (actionKind) {
    case 'Like':
      return i18n.t('LIKED_YOUR_LOOK');
    case 'Follow':
      return i18n.t('STARTED_FOLLOWING_YOU');
    case 'Comment':
      return i18n.t('COMMENTED_ON_YOUR_LOOK');
    case 'Upload':
      return i18n.t('PARIS_VIDEO_LIVE');
    default:
      return text;
  }
}