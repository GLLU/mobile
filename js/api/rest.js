import reduxApi from "redux-api";
import _ from 'lodash';
const adapterFetch = require("redux-api/lib/adapters/fetch");
import navigateTo from '../actions/sideBarNav';
import { setUser } from '../actions/user';
import { setCategories } from '../actions/filters';

import Config from 'react-native-config'

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
  users: {
    url: '/users',
    crud: true,
  },
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
  },
  changeUserAboutMe: {
    url: '/users/:id',
    crud: true
  }
}).use("fetch", adapterFetch(fetch))
    .use('rootUrl', Config.API_URL)
    .use("options", function() {
      return { headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }};
    }).
    use("responseHandler", (err, data) => err ? console.log("ERROR", err) : console.log("SUCCESS", data));
