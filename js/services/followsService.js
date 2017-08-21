import AppAPI from '../network/AppApi';

class FollowsService {
  static follow = userId => AppAPI.post(`/users/${userId}/follows/`, {}).then((data => {
    return data
  }))

  static unFollow = userId => AppAPI.delete(`/users/${userId}/follows/`, {}).then((data => {
    return data
  }))


}

export default FollowsService;
