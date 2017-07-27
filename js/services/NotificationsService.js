import AppAPI from '../network/AppApi';

const route = '/notifications';

class NotificationsService {

  static getNotifications = body => AppAPI.get(`${route}`, body);
}

export default NotificationsService;
