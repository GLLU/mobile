import * as userMapper from "./userMapper";

export function map(like) {
  return {
    ...like,
    ...userMapper.map(like.user)
  };
}
