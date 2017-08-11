import NetworkManager from './NetworkManager';

function resolveQueryParams(params) {
  return Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}

export default class AppAPI {
  static get(route, queryParams) {
    let finalRoute = route;
    if (queryParams) {
      finalRoute += `?${resolveQueryParams(queryParams)}`;
    }

    return NetworkManager.fetch(finalRoute, 'GET');
  }

  static put(route, body) {
    console.log('happenned put')
    return NetworkManager.fetch(route, 'PUT', body);
  }

  static post(route, body) {
    console.log('happenned post')
    return NetworkManager.fetch(route, 'POST', body);
  }

  static delete(route, body) {
    return NetworkManager.fetch(route, 'DELETE', body);
  }

  static postFile(route, body) {
    return NetworkManager.fetch(route, 'POST', body, true);
  }
}

