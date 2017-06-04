
export function mapLike(like) {
  return map(like)
}

function map(like, index) {
  return {
    id: like.id,
    user_id: like.user.id,
    avatar: like.user.avatar,
    name: like.user.name,
    username: like.user.username,
    is_me: like.user.is_me,
    about_me: like.user.about_me,
    is_following: like.user.is_following,
    is_follower: like.user.is_follower
  };
}
