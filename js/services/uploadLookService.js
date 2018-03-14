import _ from 'lodash';
import AppAPI from '../network/AppApi';
import * as feedLookMapper from '../mappers/lookMapper';
import SyteApi from '../network/SyteApi';
import { mapSuggestions, mapSuggestion, mapOffers } from '../mappers/uploadLookMapper';


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
    return feedLookMapper.serializeLook(data.look);
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

  static getLookSuggestions = async (imageData) => {
    try {
      const suggestions = await SyteApi.getSuggestions(imageData);
      const tagsData = [];
      for (const baseImageUrl in suggestions) {
        const suggestionArray = suggestions[baseImageUrl];
        for (let i= 0; i < suggestionArray.length; i++) {
          const data = await SyteApi.getOffers(suggestionArray[i].offers);
          if (data && data.ads && data.ads.length > 0) {
            const offers = mapOffers(data.ads);
            const suggestion = mapSuggestion(suggestionArray[i], offers);
            tagsData.push(suggestion);
          }
        }
      }
      return tagsData;
    } catch (error) {
      console.log(`upload service - ${error}`);
    }
    }

}

export default UploadLookService;
