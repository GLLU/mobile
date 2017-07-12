import * as userMapper from "./userMapper";
export function mapFollower(follow) {
  return map(follow, follow.user)
}

export function mapFollow(follow) {
  return map(follow, follow.followee)
}

function map(follow, user) {
  return {
    ...follow,
      ...userMapper.map(user)
  };
}
