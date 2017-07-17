import _ from 'lodash';
import AppAPI from '../network/AppApi';
import * as feedLookMapper from '../mappers/feedLookMapper';

const route = '/feed';

class LooksService {
  static parseResponse = (result) => {
    const looksData = _.map(result.looks || [], look => feedLookMapper.map(look));
    const looksIdsArray = LooksService.parseLooksArrayById(looksData);
    return { looksData, looksIdsArray, meta: result.meta };
  }

  static parseLooksArrayById = looks => _.map(looks, look => look.id);

  static getLooks = async (body) => {
    const result = await AppAPI.get(`${route}`, body);
    const mappedResult = LooksService.parseResponse(result);
    return mappedResult;
  };
}

export default LooksService;
