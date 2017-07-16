import AppAPI from '../network/AppApi';

const route = '/feed';

class LooksService {

  static getLooks = body => AppAPI.get(`${route}`, body);
}

export default LooksService;
