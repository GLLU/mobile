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
      selected: false,
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
