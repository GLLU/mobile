import reduxApi from "redux-api";
const adapterFetch = require("redux-api/lib/adapters/fetch");
import navigateTo from '../actions/sideBarNav';

export default reduxApi({
  facebook_sign_in: {
    url: "/v1/login/facebook_sign_in",
    options: {
      method: "post"
    },
    postfetch: [
      function({data, dispatch}) {
        console.log(`Logged in successfully: ${JSON.stringify(data)}`);
        dispatch(navigateTo('feedscreen'));
      }
    ]
  }
}).use("fetch", adapterFetch(fetch))
    .use('rootUrl', "https://sam.gllu.com")
    .use("options", function() {
      return { headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }};
    });
