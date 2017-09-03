import _ from 'lodash';
import AppAPI from '../network/AppApi';
import * as feedLookMapper from '../mappers/lookMapper';


const publishRoute = lookId => `/looks/${lookId}/publish`;
const createItemRoute = lookId => `/looks/${lookId}/items`;
const updateItemRoute = (lookId, itemId) => `/looks/${lookId}/items/${itemId}`;
const updateLookRoute = lookId => `/looks/${lookId}`;
const addItemOccasionRoute = (lookId, itemId) => `/looks/${lookId}/items/${itemId}/item_occasions`;

class UploadLookService {
  static createLook = () => AppAPI.post('/looks', {id: -1}).then((data => {
    return data
  }))

  static publishLook = lookId => AppAPI.post(`${publishRoute(lookId)}`, {}).then((data => {
    return data
  }))

  static updateLook = (lookId, body) => AppAPI.put(`${updateLookRoute(lookId)}`, {...body}).then((data => {
    return data
  }))

  static createOrEditItem = (lookId ,body, editOrCreate) =>
    AppAPI[editOrCreate.method](editOrCreate.method === 'post' ? `${createItemRoute(lookId)}` : `${updateItemRoute(lookId, editOrCreate.itemId)}`,
    {...body}
  ).then((data => {
    return data
  }))

  static addItemOccasions = (lookId, itemId ,body) =>
    AppAPI.post(`${addItemOccasionRoute(lookId, itemId)}`,
      {...body}
    ).then((data => {
      return data
    }))

}

export default UploadLookService;
