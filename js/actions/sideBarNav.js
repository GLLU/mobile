
import { actions } from 'react-native-navigation-redux-helpers';
import { closeDrawer } from './drawer';

const {
  replaceAt,
  popRoute,
  pushRoute,
} = actions;

export default function navigateTo(route, homeRoute, optional) {
  return (dispatch, getState) => {
    const navigation = getState().cardNavigation;
    const currentRouteKey = navigation.routes[navigation.routes.length - 1].key;

    dispatch(closeDrawer());

    if (currentRouteKey !== homeRoute && route !== homeRoute) {
      console.log('1');
      dispatch(replaceAt(currentRouteKey, { key: route, index: 1 }, navigation.key));
    } else if (currentRouteKey !== homeRoute && route === homeRoute) {
      console.log('2');
      dispatch(popRoute(navigation.key));
    } else if (currentRouteKey === homeRoute && route !== homeRoute) {
      console.log('3',optional);
      dispatch(pushRoute({ key: route, index: 1, optional }, navigation.key));
    }
  };
}
