import _ from 'lodash';
import AppAPI from '../network/AppApi';
import * as feedLookMapper from '../mappers/lookMapper';
import SyteApi from '../network/SyteApi';
import { mapSuggestion, mapOffers } from '../mappers/itemMapper';
import { removeMultipleItemIndex } from '../utils/UploadUtils';


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

  static getLookSuggestions = (imageData) => {
    try {
      return SyteApi.getSuggestions(imageData).then((suggestions) => {
        const tagsData = [];
        for (const baseImageUrl in suggestions) {
          if (suggestions[baseImageUrl]) {
            const suggestionArray = suggestions[baseImageUrl];
            removeMultipleItemIndex(suggestionArray);
            for (let i = 0; i < suggestionArray.length; i++) {
              const suggestion = {
                category: suggestionArray[i].label,
                cover_x_pos: suggestionArray[i].center[0],
                cover_y_pos: suggestionArray[i].center[1],
                offersLink: suggestionArray[i].offers,
              };
              tagsData.push(suggestion);
            }
          }
        }
        return tagsData;
      });
    } catch (error) {
      console.log(`upload service - ${error}`);
    }
  }

  static getItemOffers = (tagData) => {
    const suggestion = tagData;
    try {
      return SyteApi.getOffers(tagData.offersLink).then((data) => {
        if (data && data.ads && data.ads.length > 0) {
          const offers = mapOffers(data.ads);
          suggestion.offers = offers;
          return suggestion;
        }
      });
    } catch (error) {
      console.log(`upload service - ${error}`);
    }
  }
}



export default UploadLookService;
