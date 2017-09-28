export function map(suggestion) {
  return {
    id: suggestion.id,
    rowNumber: suggestion.row_number,
    query: suggestion.query,
    title: suggestion.title,
    imageUri: suggestion.image_uri ? suggestion.image_uri : null,
    color: suggestion.color ? suggestion.color : null,
  };
}
