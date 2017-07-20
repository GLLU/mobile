export function map(user) {
  return {
    userId: user.id,
    avatar: user.avatar,
    name: user.name,
    username: user.username,
    is_following: user.is_following,
    about_me: user.about_me,
    isMe: user.is_me
  }
}


