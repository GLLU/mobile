import reduxApi from "redux-api";
import _ from 'lodash';
const adapterFetch = require("redux-api/lib/adapters/fetch");
import navigateTo from '../actions/sideBarNav';
import { setUser } from '../actions/user';
import { setCategories } from '../actions/filters';

export const API_URL = 'https://sam.gllu.com/v1';
// const API_URL = 'https://staging-api.gllu.com/v1';
// const API_URL = 'http://localhost:9292/v1';

export default reduxApi({
  facebook_auth: {
    url: "/facebook_auth",
    crud: true,
  },
  auth: {
    url: "/auth",
    crud: true,
  },
  users: {
    url: '/users',
    crud: true,
  },
  // sizes: {
  //   url: '/users/5/size',
  //   options: {
  //     method: "get",
  //     headers: {
  //       "Authorization": `Token token=ZPIx61AMcqNv007YCYECrQtt`,
  //       "Accept": "application/json",
  //       "Content-Type": "application/json"
  //     }
  //   },
  //   postfetch: [
  //     ({data, dispatch}) => {
  //       alert('got size');
  //       alert(data);
  //     }
  //   ]
  // },
  size: {
    url: '/users/:user_id/size',
    options: {
      method: 'post'
    },
    crud: true
  },
  tags: '/tags',
  brands: {
    url: '/brands',
    crud: true,
  },
  sizes: '/sizes',
  feeds: {
    url: '/feed',
    options: {
      method: 'get',
      headers: {
        "Authorization": `Token token=kfPCZlx9HeV7i3J6oloiigtt`,
      }
    }
  },
  looks: {
    url: '/looks/:id',
    crud: true
  },
  stats: {
    url: '/users/:id/stats',
    options: {
      method: 'get'
    }
  },
  publish: {
    url: '/looks/:look_id/publish',
    options: {
      method: 'post'
    }
  },
  likes: {
    url: '/looks/:look_id/likes',
    crud: true,
  },
  items: {
    url: '/looks/:look_id/items/:id',
    crud: true,
  }
}).use("fetch", adapterFetch(fetch))
    .use('rootUrl', API_URL)
    .use("options", function() {
      return { headers: {
        "Authorization": `Token token=ZPIx61AMcqNv007YCYECrQtt`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      }};
    }).
    use("responseHandler", (err, data) => err ? console.log("ERROR", err) : console.log("SUCCESS", data));
