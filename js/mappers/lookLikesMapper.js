export function map(like) {
  const {user} = like;
  return {
    id: like.id,
    user_id: user.id,
    avatar: user.avatar,
    name: user.name,
    username: user.username,
    is_me: user.is_me,
    about_me: user.about_me,
    is_following: user.is_following,
    is_follower: user.is_follower
  };
}
