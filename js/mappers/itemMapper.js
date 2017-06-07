export default function map(item) {
  return {
    id: item.id,
    locationX: item.cover_x_pos,
    locationY: item.cover_y_pos,
    price: item.price,
    userId: item.user_id,
    lookId: item.look_id,
    editing: true,
    category: null,
    brand: null,
    itemSizeRegion: null,
    itemSizeValue: null,
    description: '',
    sharingType: true,
    sharingUrl: '',
    location: 'us',
    photos: [],
    video: '',
    occasions: [],
    tags: [],
    ...item,
  }
}
