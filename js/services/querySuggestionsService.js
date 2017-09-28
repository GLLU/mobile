import * as _ from 'lodash';
import * as suggestionMapper from '../mappers/querySuggestionMapper'

const suggestions = [
  {
    id: 0,
    row_number: 1,
    query: {
      category: 'Jeans',
      occasion: 'Breakfast',
    },
    title: 'How to build a tall tower',
    image_uri: 'http://www.ldi.co.il/media/catalog/category/BTB_jpg.jpg',
  },
  {
    id: 1,
    row_number: 2,
    query: {
      category: 'Jeans',
      occasion: 'Breakfast',
      term: 'yellow',
    },
    title: 'Strings \nOf \nIron',
    color: '#ff3a7d',
  },
  {
    id: 2,
    row_number: 2,
    query: {
      category: 'Jeans',
      occasion: 'Breakfast',
      term: 'yellow',
    },
    title: 'Bat-mobile 101',
    image_uri: 'https://images.alphacoders.com/371/thumb-1920-371.jpg',
  },
  {
    id: 3,
    row_number: 2,
    query: {
      category: 'Jeans',
      occasion: 'Breakfast',
      term: 'yellow',
    },
    title: 'kryptonite recipes',
    image_uri: 'http://cdn.playbuzz.com/cdn/62530326-1b72-4685-b59b-85bae109fa36/5f076c45-61b6-469f-ab63-cd2f0be7db26.jpg',
  },
  {
    id: 4,
    row_number: 3,
    query: {
      category: 'Jeans',
      occasion: 'Breakfast',
      term: 'yellow',
    },
    title: 'Green is the new Black',
    image_uri: 'https://static.comicvine.com/uploads/original/8/80111/2797109-hulk_marvel_4.jpg',
  },
  {
    id: 5,
    row_number: 3,
    query: {
      category: 'Jeans',
      occasion: 'Breakfast',
      term: 'yellow',
    },
    title: 'A turtles life',
    image_uri: 'http://www.cbr.com/wp-content/uploads/2017/01/the-flash-barry-allen-cw.jpg',
  },
  {
    id: 6,
    row_number: 4,
    query: {
      category: 'Jeans',
      occasion: 'Breakfast',
      term: 'yellow',
    },
    title: 'How to build a tall tower',
    image_uri: 'http://www.ldi.co.il/media/catalog/category/BTB_jpg.jpg',
  },

];

class BestMatchSuggestionsService {
  static getSuggestions = () =>
    new Promise((resolve, reject) => {
      const serializedSuggestions = _.groupBy(_.map(suggestions, (suggestion) => suggestionMapper.map(suggestion)), item => item.rowNumber)
      resolve(serializedSuggestions);
    })
}

export default BestMatchSuggestionsService;
