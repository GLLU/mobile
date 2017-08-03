export const bodyTypesMapper = bodytypes => _.chain(Object.keys(bodytypes))
  .map(key =>
    _.map(bodytypes[key], bodyType => ({
      id: bodyType.body_type,
      name: bodyType.name,
      gender: key,
      kind: 'body_type',
      icon: {
        url: bodyType.filterImageUrl,
        url_hover: bodyType.filterImageUrlActive,
      },
    })))
  .flatten()
  .value();