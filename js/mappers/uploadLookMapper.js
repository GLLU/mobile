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