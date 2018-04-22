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
      brand_name: offer.merchant,
      image_url: offer.imageUrl,
      price: offer.price,
      url: offer.offer,
      selected: false,
    };
  });
}

export function mapSuggestion(suggestion, offers) {
  return {
    category: suggestion.label,
    cover_x_pos: suggestion.center[0],
    cover_y_pos: suggestion.center[1],
    offers,
  };
}

export function _serializeOffers(offers) {
  return offers.map(function(offer) {
    return {
      id: offer.id,
      brand_name: offer.brand.name,
      image_url: offer.image_url,
      url: offer.url,
    };
  });
}

export function _serializeItem(item) {
  if (item.product_suggestions) {
    return {
      id: item.id,
      category: (item.category && item.category.name) ? item.category.name : 'N/A',
      cover_x_pos: item.cover_x_pos,
      cover_y_pos: item.cover_y_pos,
      offers: _serializeOffers(item.product_suggestions),
    };
  } else {
    return item;
  }
}

export function serializeItems(items) {
  return _.map(items, (item) => {
    if (item.product_suggestions && item.product_suggestions.length > 0) {
      return _serializeItem(item);
    } else {
      return item;
    }
  });
}
