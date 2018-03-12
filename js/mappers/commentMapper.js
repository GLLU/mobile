import * as userMapper from "./userMapper";

export function mapComment(comment) {
  return map(comment, comment.user)
}

function map(comment, user) {
  return {
    ...comment,
    userId: comment.user_id,
    user: userMapper.map(user)
  };
}
