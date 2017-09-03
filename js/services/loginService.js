import AppAPI from '../network/AppApi';

const route = '/auth';

class LoginService {

  static signIn = body => AppAPI.post(`${route}`, body);
  static signInInstagram = body => AppAPI.post(`/instagram_auth`, body);
}

export default LoginService;
