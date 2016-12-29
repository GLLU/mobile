import reduxApi from "redux-api";
import _ from 'lodash';
const adapterFetch = require("redux-api/lib/adapters/fetch");
import navigateTo from '../actions/sideBarNav';
import { setUser } from '../actions/user';

export default reduxApi({
  facebook_sign_in: {
    url: "/login/facebook_sign_in",
    options: {
      method: "post"
    },
    postfetch: [
      ({data, dispatch}) => {
        console.log(`Logged in successfully: ${JSON.stringify(data)}`);
        const attributes = data['data']['attributes'];
        global.apiKey = attributes['api-key'];
        const user = _.merge({ id: data['data']['id'] }, { name: attributes['name'], email: attributes['email'] });
        dispatch(setUser(user));
        dispatch(navigateTo('feedscreen'));
      }
    ]
  },
  sizes: {
    url: '/users/5/size',
    options: {
      method: "get",
      headers: {
        "Authorization": `Token token=ZPIx61AMcqNv007YCYECrQtt`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    },
    postfetch: [
      ({data, dispatch}) => {
        alert('got size');
        alert(data);
      }
    ]
  },
  size: {
    url: '/users/:user_id/size',
    options: {
      headers: {
        "Authorization": `Token token=ZPIx61AMcqNv007YCYECrQtt`
      }
    },
    crud: true
  }
}).use("fetch", adapterFetch(fetch))
    .use('rootUrl', "https://sam.gllu.com/v1")
    .use("options", () => {
      return { headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }};
    }).
    use("responseHandler", (err, data) => err ? console.log("ERROR", err) : console.log("SUCCESS", data));
