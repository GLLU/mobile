import reduxApi from "redux-api";
import _ from 'lodash';
import navigateTo from '../actions/sideBarNav';
import { setUser } from '../actions/user';
import { setCategories } from '../actions/filters';
const adapterFetch = require("redux-api/lib/adapters/fetch");

import Utils from '../Utils';
import Config from 'react-native-config';

export const API_URL = Config.API_URL;

export default reduxApi({
  facebook_auth: {
    url: "/facebook_auth",
    crud: true,
  },
  auth: {
    url: "/auth",
    crud: true,
  },
  password_recovery: {
    url: "/password_recovery",
    crud: true,
  },
  users: {
    url: '/users/:id',
    crud: true,
  },
  size: {
    url: '/users/:user_id/size',
    options: {
      method: 'post'
    },
    crud: true
  },
  category_tags: '/tags?kind=category',
  occasion_tags: '/tags?kind=occasion',
  brands: {
    url: '/brands',
    crud: true,
  },
  sizes: '/sizes',
  feeds: {
    url: '/feed',
    options: {
      method: 'get',
    }
  },
  report_abuse: {
    url: "/abuse",
    crud: true,
  },
  looks: {
    url: '/looks/:id',
    crud: true
  },
  user_looks: {
    url: '/users/:id/looks/?all=true',
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
  },
  item_tags: {
    url: '/looks/:look_id/items/:item_id/item_tags/:id',
    crud: true,
  },
  changeUserAboutMe: {
    url: '/users/:id',
    crud: true
  },
  item_occasions: {
    url: '/looks/:look_id/items/:item_id/item_occasions/:id',
    crud: true,
  },
  follows: {
    //query parameters: :page[number], page[size]
    url: '/users/:user_id/follows/',
    crud: true,
  },
  followers: {
    //query parameters: :page[number], page[size]
    url: '/users/:user_id/followers/',
    options: {
      method: 'get'
    }
  },
  comments: {
    //query parameters: :page[number], page[size]
    url: '/looks/:look_id/comments/',
    crud: true,
  }
}).use("fetch", (url, options) => {
  console.log('making request', url, options);
  return adapterFetch(fetch)(url, options);
})
  .use('rootUrl', Config.API_URL)
  .use("options", function () {
    return {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    };
  }).use("responseHandler", (err, data) => {
    if (err) {
      console.log("ERROR", err);
      Utils.notifyRequestError(new Error(JSON.stringify(err)), data);
    } else {
      console.log("SUCCESS", data)
    }
  });
