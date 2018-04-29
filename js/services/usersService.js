import AppAPI from '../network/AppApi';
import * as userMapper from '../mappers/userMapper';
import * as _ from 'lodash';
import * as metaMapper from '../mappers/metaMapper';
import * as feedLookMapper from '../mappers/lookMapper';
import { serializeItems } from '../mappers/itemMapper';


const route = '/users';

const blockRoute = userId => `${route}/${userId}/blocked_users`;
const getUsersRoute = userId => `${route}`;
const getUsersSuggestionRoute = () => `${route}/suggestions`;

class usersService {

  static getBlockedUsers = async (userId, pageNumber = 1) => {
    const data = await AppAPI.get(`${blockRoute(userId)}`, {'page[number]': pageNumber});
    const blockedUsers = _.map(data.users, (user) => {
      const mappedUser = userMapper.map(user);
      return mappedUser;
    });
    const meta = metaMapper.map(data.meta);
    return {
      blockedUsers,
      meta,
    };
  };

  static getUsers = async (userId, pageNumber = 1, term) => {
    const data = await AppAPI.get(`${getUsersRoute(userId)}`, {term});
    const users = _.map(data.users, (user) => {
      const mappedUser = userMapper.map(user);
      return mappedUser;
    });
    const meta = metaMapper.map(data.meta);
    return {
      users,
      meta,
    };
  };

  static getSuggestionsUsers = async () => {
    const data = await AppAPI.get(`${getUsersSuggestionRoute()}`);
    const users = _.map(data.users, (user) => {
      const mappedUser = userMapper.map(user);
      return mappedUser;
    });
    return {
      users,
    };
  };

  static getUserLooks = (userId, query) => {
    return AppAPI.get(`${route}/${userId}/looks`, query).then((response) => {
      const looks = feedLookMapper.serializeLooks(response.looks);
      const serializedLooks = _.map(looks, (look) => {
        return {
          ...look,
          items: serializeItems(look.items),
        };
      });
      return {looks: serializedLooks, meta: response.meta};
    });
  }

  static getFavoriteLooks = (userId, query) => {
    return AppAPI.get(`${route}/${userId}/favorite_looks`, query).then((response) => {
      const looks = feedLookMapper.serializeLooks(response.looks);
      const serializedLooks = _.map(looks, (look) => {
        return {
          ...look,
          items: serializeItems(look.items),
        };
      });
      return {looks: serializedLooks, meta: response.meta};
    });
  }

  static block = (userId, blockedUserId) => AppAPI.post(`${blockRoute(userId)}`, {blocked_user_id: blockedUserId});

  static unblock = (userId, blockedUserId) => AppAPI.delete(`${blockRoute(userId)}/${blockedUserId}`);

  static setFavoriteLook = (userId, lookId) => AppAPI.post(`${route}/${userId}/favorite_looks`, {look_id: lookId});

  static removeFavoriteLook = (userId, lookId) => AppAPI.delete(`${route}/${userId}/favorite_looks`, {look_id: lookId});

}

export default usersService;
