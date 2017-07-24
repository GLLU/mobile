import AppAPI from '../network/AppApi';
import * as userMapper from "../mappers/userMapper";
import * as _ from "lodash";
import * as metaMapper from "../mappers/metaMapper";

const route = '/users';

const blockRoute = (userId) => `${route}/${userId}/blocked_users`;

class usersService {

  static getBlockedUsers = async (userId, pageNumber = 1) => {
    const data = await AppAPI.get(`${blockRoute(userId)}`, {'page[number]': pageNumber});
    const blockedUsers = _.map(data.users, user => {
      const mappedUser = userMapper.map(user);
      mappedUser.id = mappedUser.userId;
      return mappedUser;
    });
    const meta = metaMapper.map(data.meta);
    return {
      blockedUsers,
      meta
    }
  };

  static block = (userId, blockedUserId) => AppAPI.post(`${blockRoute(userId)}`, {blocked_user_id: blockedUserId});

  static unblock = (userId, blockedUserId) => AppAPI.delete(`${blockRoute(userId)}/${blockedUserId}`);
}

export default usersService;
