import _ from 'lodash';
import AppAPI from '../network/AppApi';
import * as feedLookMapper from '../mappers/lookMapper';

const publishRoute = lookId => `/looks/${lookId}/publish`;
const createItemRoute = lookId => `/looks/${lookId}/items`;


class UploadLookService {
  static createLook = () => AppAPI.post('/looks', {id: -1}).then((data => {
    console.log('new look data',data)
    return data
  }))

  static publishLook = lookId => AppAPI.post(`${publishRoute(lookId)}`, {}).then((data => {
    console.log('published look data', data);
    return data
  }))

  static createItem = (lookId ,body) => {
    console.log('itemBody',{...body.item});
    AppAPI.post(`${createItemRoute(lookId)}`,
    {...body.item}
  ).then((data => {
    console.log('new item data',data);
    return data
  }))}

}

export default UploadLookService;
