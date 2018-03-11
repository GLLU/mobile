import SyteApi from '../network/SyteApi';
import { mapSuggestions } from '../mappers/uploadLookMapper';

class uploadLookService {
  static getLookSuggestions = async (imageData, retryCount = 0) => {
    try {
      const data = await SyteApi.getSuggestions(imageData);
      const suggestionsData = mapSuggestions(data);
      return suggestionsData;
    } catch (error) {
      console.log(`upload service - ${error}`);
    }
  }
}

export default uploadLookService;
