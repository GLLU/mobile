export function mapFollower(follow) {
  return map(follow, 'user')
}

export function mapFollow(follow) {
  return map(follow, 'followee')
}

function map(follow, index) {
  return {
    id: follow.id,
    user_id: follow[index].id,
    avatar: follow[index].avatar,
    name: follow[index].name,
    username: follow[index].username,
    about_me: follow[index].about_me,
    is_me: follow[index].is_me,
    is_following: follow[index].is_following,
    is_follower: follow[index].is_follower
  };
}
