import itemMapper from './itemMapper';
import _ from 'lodash';

export default function map(look) {
  const items = look.items.map(item => itemMapper(item));
  return {
    lookId: look.id,
    itemId: null,
    image: null,
    description: '',
    video: '',
    ...look,
    items,
  }
}
