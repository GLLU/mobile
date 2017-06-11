export function mapFollower(follow) {
  return map(follow, follow.user)
}

export function mapFollow(follow) {
  return map(follow, follow.followee)
}

function map(follow, user) {
  return {
    id: follow.id,
    user_id: user.id,
    avatar: user.avatar,
    name: user.name,
    username: user.username,
    about_me: user.about_me,
    is_me: user.is_me,
    is_following: user.is_following,
    is_follower: user.is_follower
  };
}
