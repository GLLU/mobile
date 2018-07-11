export function map(suggestion) {
  return {
    id: suggestion.id,
    rowNumber: suggestion.row_number,
    query: suggestion.query,
    title: suggestion.title,
    imageUri: suggestion.image_url,
    color: suggestion.color,
  };
}
