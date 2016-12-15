import reduxApi from "redux-api";
var adapterFetch = require("redux-api/lib/adapters/fetch");

export default reduxApi({
  facebook_sign_in: {
    url: "/v1/login/facebook_sign_in",
    options: {
      method: "post"
    },
    postfetch: [
      function({data, actions, dispatch, getState, request}) {
        alert(`Logged in successfully: ${JSON.stringify(data)}`);
      }
    ]  
  }
}).use("fetch", adapterFetch(fetch))
    .use('rootUrl', "https://sam.gllu.com")
    .use("options", function() {
      return { headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      };
    });