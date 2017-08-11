import AppAPI from '../network/AppApi';
import {serializeColors} from '../mappers/colorsSerializer';

const route = '/colors';

class ColorsService {
  static getColors = () => AppAPI.get(`${route}`).then(colors => serializeColors(colors));
}

export default ColorsService;
