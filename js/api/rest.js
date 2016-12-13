import "isomorphic-fetch";
import reduxApi, {transformers} from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";
export default reduxApi({
  facebook_sign_in: {
    url: "/v1/login/facebook_sign_in",
    options: {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }
  }
}).use("fetch", adapterFetch(fetch)).use('rootUrl', "https://sam.gllu.com");