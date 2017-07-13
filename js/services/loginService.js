import AppAPI from '../network/AppApi';

const route = '/auth';

class LoginService {

  static signIn = body => AppAPI.post(`${route}`, body);
}

export default LoginService;
