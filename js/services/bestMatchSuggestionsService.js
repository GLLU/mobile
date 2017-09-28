import * as _ from 'lodash';

const suggestions = [
  {
    id: 0,
    rowNumber: 1,
    query: {
      category: 'Jeans',
      occasion: 'Breakfast',
    },
    title: 'How to build a tall tower',
    imageUri: 'http://www.ldi.co.il/media/catalog/category/BTB_jpg.jpg',
  },
  {
    id: 1,
    rowNumber: 2,
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
    rowNumber: 2,
    query: {
      category: 'Jeans',
      occasion: 'Breakfast',
      term: 'yellow',
    },
    title: 'Bat-mobile 101',
    imageUri: 'https://images.alphacoders.com/371/thumb-1920-371.jpg',
  },
  {
    id: 3,
    rowNumber: 2,
    query: {
      category: 'Jeans',
      occasion: 'Breakfast',
      term: 'yellow',
    },
    title: 'kryptonite recipes',
    imageUri: 'http://cdn.playbuzz.com/cdn/62530326-1b72-4685-b59b-85bae109fa36/5f076c45-61b6-469f-ab63-cd2f0be7db26.jpg',
  },
  {
    id: 4,
    rowNumber: 3,
    query: {
      category: 'Jeans',
      occasion: 'Breakfast',
      term: 'yellow',
    },
    title: 'Green is the new Black',
    imageUri: 'https://static.comicvine.com/uploads/original/8/80111/2797109-hulk_marvel_4.jpg',
  },
  {
    id: 5,
    rowNumber: 3,
    query: {
      category: 'Jeans',
      occasion: 'Breakfast',
      term: 'yellow',
    },
    title: 'A turtles life',
    imageUri: 'http://www.cbr.com/wp-content/uploads/2017/01/the-flash-barry-allen-cw.jpg',
  },
  {
    id: 6,
    rowNumber: 4,
    query: {
      category: 'Jeans',
      occasion: 'Breakfast',
      term: 'yellow',
    },
    title: 'How to build a tall tower',
    imageUri: 'http://www.ldi.co.il/media/catalog/category/BTB_jpg.jpg',
  },

];

class BestMatchSuggestionsService {
  static getSuggestions = () =>
    new Promise((resolve, reject) => {
      resolve(suggestions);
    })
}

export default BestMatchSuggestionsService;
