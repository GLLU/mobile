import * as userMapper from "./userMapper";

export function map(like) {
  return {
    ...like,
    user: userMapper.map(like.user)
  };
}
