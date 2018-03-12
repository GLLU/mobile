export default function map(item) {
  return {
    id: item.id,
    locationX: item.cover_x_pos,
    locationY: item.cover_y_pos,
    userId: item.user_id,
    lookId: item.look_id,
    category: item.category ? item.category.id : -1,
    brand: item.brand ? item.brand.id : null,
    occasions: _.map(item.occasions, (occasion) => {
      return occasion.id
    }),
    color_ids: _.map(item.color_ids, (color) => {
      return color
    }),
    tags: item.tags ? item.tags : [],
    description: item.description ? item.description : '',
    url: item.url ? item.url : null,
    isNew: item.isNew ? true : false,
    isCustom: item.isCustom,
  }
}
