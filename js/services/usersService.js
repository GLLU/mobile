import AppAPI from '../network/AppApi';

const route = '/users';

const blockRoute = (userId)=>`${route}/${userId}/blocked_users`;

class usersService {

  static blockedUsers = userId => AppAPI.get(`${blockRoute(userId)}`);

  static block = (userId,blockedUserId) => AppAPI.post(`${blockRoute(userId)}`,{blocked_user_id:blockedUserId});

  static unblock = (userId,blockedUserId) => AppAPI.delete(`${blockRoute(userId)}/${blockedUserId}`);
}

export default usersService;
