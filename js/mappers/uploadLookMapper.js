import itemMapper from './itemMapper';

export default function map(look) {
  const items = look.items.map(item => itemMapper(item));
  return {
    lookId: look.id,
    image: null,
    description: '',
    video: '',
    ...look,
    items,
  }
}

export function mapOffers(offers) {
  return offers.map(function(offer) {
    return {
      brand: offer.merchant,
      imageUrl: offer.imageUrl,
      price: offer.price,
      link: offer.offer,
    };
  });
}

export function mapSuggestion(suggestion, offers) {
  return {
    category: suggestion.label,
    x: suggestion.center[0],
    y: suggestion.center[1],
    offers,
  };
}

export function mapSuggestions(suggestions) {
  return {
    tags: getTags(suggestions),
  };
}

function getTags(suggestions) {
  let coords = [];
  //we have only one baseImageUrl (the prop name is the url that syte store the image)
  for (const baseImageUrl in suggestions) {
    if (suggestions.hasOwnProperty(baseImageUrl)) {
      const suggstionArray = suggestions[baseImageUrl];
      let item;
      for (let i= 0; i < suggstionArray.length; i++) {
        item = {
          category: suggstionArray[i].label,
          x: suggstionArray[i].center[0],
          y: suggstionArray[i].center[1],
        };
        coords.push(item);
      }
    }
  }
  return coords;
}
