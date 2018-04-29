import _ from 'lodash';
import AppAPI from '../network/AppApi';
import * as feedLookMapper from '../mappers/lookMapper';
import { serializeItems } from '../mappers/itemMapper';

const route = '/feed';

class LooksService {
  static getLooks = body => AppAPI.get(`${route}`, body).then(((data) => {
    const looks = feedLookMapper.serializeLooks(data.looks);
    const serializedLooks = _.map(looks, (look) => {
      return {
        ...look,
        items: serializeItems(look.items),
      };
    });
    return { looks: serializedLooks, meta: data.meta };
  }));

  static getVideos = body => AppAPI.get(`${route}`, { ...body, 'videos': true }).then(((data) => {
    const looks = feedLookMapper.serializeLooks(data.looks);
    return { looks, meta: data.meta };
  }));

  static deleteLook = (lookId) => {
    AppAPI.delete(`/looks/${lookId}/publish`);
  }
}

export default LooksService;
