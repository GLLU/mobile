import itemMapper from './itemMapper';

export default function map(look) {
  const items = look.items.map(item => itemMapper(item));
  console.log('looks', look)
  return {
    lookId: look.id,
    image: null,
    description: '',
    video: '',
    ...look,
    items,
  }
}

export function mapSuggestions(suggestions) {
  return {
    tags: getTags(suggestions),
  };
}

function getTags(suggestions) {
  let coords = [];
  for (const property in suggestions) {
    if (suggestions.hasOwnProperty(property)) {
      const suggstionArray = suggestions[property];
      let item;
      for (let i= 0; i < suggstionArray.length; i++) {
        item = {
          item: property,
          x: suggstionArray[i].center[0],
          y: suggstionArray[i].center[1],
        };
        coords.push(item);
      }
    }
  }
  return coords;
}
