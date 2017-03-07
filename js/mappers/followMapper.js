function map(follow){
    return {
        id: follow.id,
        user_id: follow.user_id,
        avatar: follow.user.avatar,
        name: follow.user.name,
        username: follow.user.username,
        about_me: follow.user.about_me,
        is_following: follow.user.is_following,
        is_follower: follow.user.is_follower
    };
}

exports.map=map;
