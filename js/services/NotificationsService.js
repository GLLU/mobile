import AppAPI from '../network/AppApi';
import * as notificationMapper from '../mappers/notificationsMapper';

const route = '/notifications';

class NotificationsService {

  static getNotifications = body => AppAPI.get(`${route}`, body).then((data => {
    const notifications = data.notifications.map(notificationMapper.map)
    return  { notifications };
  }))
}

export default NotificationsService;
