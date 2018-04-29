import _ from 'lodash';
import AppAPI from '../network/AppApi';
import { serializeItems } from '../mappers/itemMapper';

class ItemsService {
  static getItems = lookId => AppAPI.get(`/looks/${lookId}/items`).then(((data) => {
    const items = serializeItems(data.items);
    return { items };
  }));

  static clickOnProduct = (url, lookId, itemId, suggId) => {
    AppAPI.post(`/looks/${lookId}/items/${itemId}/product_suggestions/${suggId}/product_clicks?redirect=false`);
  }
}

export default ItemsService;
