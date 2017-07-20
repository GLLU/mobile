import _ from 'lodash';
import AppAPI from '../network/AppApi';
import * as feedLookMapper from '../mappers/lookMapper';

const route = '/feed';

class LooksService {
  static getLooks = body => AppAPI.get(`${route}`, body).then((data => {
    const looks = feedLookMapper.serializeLooks(data.looks)
    return { looks, meta: data.meta };
  }))
  }

export default LooksService;
