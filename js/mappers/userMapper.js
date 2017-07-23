export function map(user) {
  return {
    userId: user.id,
    avatar: user.avatar,
    name: user.name,
    username: user.username,
    isFollowing: user.is_following,
    aboutMe: user.about_me,
    isMe: user.is_me,
  };
}
