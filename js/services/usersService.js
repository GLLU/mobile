import AppAPI from '../network/AppApi';

const route = '/users';

const blockRoute = (userId)=>`${route}/${userId}/block`;

class usersService {

  static blockedUsers = userId => AppAPI.get(`${blockRoute(userId)}`);

  static block = (userId,blockedUserId) => AppAPI.post(`${blockRoute(userId)}/${blockedUserId}`);

  static unblock = (userId,blockedUserId) => AppAPI.delete(`${blockRoute(userId)}/${blockedUserId}`);
}

export default usersService;
