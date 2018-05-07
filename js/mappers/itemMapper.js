export default function map(item) {
  if (item.offers || item.product_suggestions || item.offersLink) {
    return {
      id: item.id,
      locationX: item.cover_x_pos,
      locationY: item.cover_y_pos,
      userId: item.user_id,
      lookId: item.look_id,
      category: item.category ? item.category : '',
      offers: item.offers,
      offersLink: item.offersLink,
      tags: item.tags ? item.tags : [],
      description: item.description ? item.description : '',
      isNew: true,
      isCustom: false,
    };
  } else {
    return {
      id: item.id,
      locationX: item.cover_x_pos,
      locationY: item.cover_y_pos,
      userId: item.user_id,
      lookId: item.look_id,
      category: item.category ? item.category.id : -1,
      brand: item.brand ? item.brand.id : null,
      occasions: _.map(item.occasions, (occasion) => {
        return occasion.id;
      }),
      color_ids: _.map(item.color_ids, (color) => {
        return color;
      }),
      tags: item.tags ? item.tags : [],
      description: item.description ? item.description : '',
      url: item.url ? item.url : null,
      isNew: item.isNew,
      isCustom: true,
    };
  }
}

export function mapOffers(offers) {
  return offers.map(function(offer) {
    return {
      brand_name: offer.merchant,
      image_url: offer.imageUrl,
      price: offer.price.replace('$', ''),
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
    offersLink: suggestion.offersLink,
  };
}

export function _serializeOffers(offers) {
  return offers.map(function(offer) {
    return {
      id: offer.id,
      brand_name: offer.brand.name,
      image_url: offer.image_url,
      url: offer.url,
      price: offer.price,
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
