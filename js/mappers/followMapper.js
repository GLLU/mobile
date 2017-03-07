export function mapFollower(follow){
    return map(follow,'user')
}

export function mapFollow(follow){
    return map(follow,'followee')
}

function map(follow,index){
    return {
        id: follow.id,
        user_id: follow.user_id,
        avatar: follow[index].avatar,
        name: follow[index].name,
        username: follow[index].username,
        about_me: follow[index].about_me,
        is_following: follow[index].is_following,
        is_follower: follow[index].is_follower
    };
}
