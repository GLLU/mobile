import reduxApi from "redux-api";
import _ from 'lodash';
const adapterFetch = require("redux-api/lib/adapters/fetch");
import navigateTo from '../actions/sideBarNav';
import { setUser } from '../actions/user';
import { setCategories } from '../actions/filters';

const API_URL = 'https://sam.gllu.com/v1';
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
  // size: {
  //   url: '/users/:user_id/size',
  //   options: {
  //     headers: {
  //       "Authorization": `Bearer hFHv8LbPJIhB1HrUQ62rowtt`
  //     }
  //   },
  //   crud: true
  // },
  tags: '/tags',
  brands: {
    url: '/brands',
    crud: true,
  },
  feeds: {
    url: '/feed',
    options: {
      method: 'get'
    }
  },
  looks: {
    url: '/looks/:id',
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
  like: {
    url: '/looks/:look_id/likes',
    crud: true,
    options: {
      method: 'post'
    }
  },
  unlike: {
    url: '/looks/:look_id/likes',
    crud: true,
    options: {
      method: 'delete'
    }
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
