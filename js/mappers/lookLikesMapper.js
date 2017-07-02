
export function map(like) {
  return {
    ...like,
    ...like.user
  };
}
