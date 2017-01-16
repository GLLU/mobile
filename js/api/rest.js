import reduxApi from "redux-api";
import _ from 'lodash';
const adapterFetch = require("redux-api/lib/adapters/fetch");
import navigateTo from '../actions/sideBarNav';
import { setUser } from '../actions/user';
import { setCategories } from '../actions/filters';

export default reduxApi({
  email_sign_up: {
      url: "/signup",
      options: {
          method: "post"
      },
      postfetch: [
          ({data, dispatch}) => {
              console.log('data sign up rest',data)
              console.log(`Logged in successfully: ${JSON.stringify(data)}`);
              const attributes = data['data']['attributes'];
              global.apiKey = attributes['api-key'];
              const user = _.merge({ id: data['data']['id'] }, { name: attributes['name'], email: attributes['email'] });
              dispatch(setUser(user));
              dispatch(navigateTo('feedscreen'));
          }
      ]
  },
  email_sign_in: {
      url: "/login",
      options: {
          method: "post"
      },
      postfetch: [
          ({data, dispatch}) => {
              console.log('data sign up rest',data)
              console.log(`Logged in successfully: ${JSON.stringify(data)}`);
              const attributes = data['data']['attributes'];
              global.apiKey = attributes['api-key'];
              const user = _.merge({ id: data['data']['id'] }, { name: attributes['name'], email: attributes['email'] });
              dispatch(setUser(user));
              dispatch(navigateTo('feedscreen'));
          }
      ]
  },
  forgot_password: {
      url: "/password_recovery",
      options: {
          method: "post"
      },
      postfetch: [
          ({data}) => {
              console.log('data forgot password rest',data)
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
  },
}).use("fetch", adapterFetch(fetch))
    .use('rootUrl', "https://sam.gllu.com/v1")
    .use("options", () => {
      return { headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }};
    }).
    use("responseHandler", (err, data) => err ? console.log("ERROR", err) : console.log("SUCCESS", data));
