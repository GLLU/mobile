import * as userMapper from "./userMapper";
export function mapFollower(follow) {
  return map(follow);
}

export function mapFollow(follow) {
  return map(follow);
}

function map(follow) {
  return {
    ...follow,
      user:userMapper.map(follow.user),
    followee:userMapper.map(follow.followee),
  };
}
