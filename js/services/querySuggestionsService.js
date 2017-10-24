import * as _ from 'lodash';
import * as suggestionMapper from '../mappers/querySuggestionMapper'
import AppAPI from '../network/AppApi';

class BestMatchSuggestionsService {
  static getSuggestions = async () => {
    const data = await AppAPI.get("/query_suggestions");
    return _.groupBy(_.map(data.query_suggestions, (suggestion) => suggestionMapper.map(suggestion)), item => item.rowNumber);
  }
}


export default BestMatchSuggestionsService;
