
import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sequenceAction from 'redux-sequence-action';
import { persistStore } from 'redux-persist';
import reducer from './reducers';
import promise from './promise';
import createLogger from 'redux-logger';

import { setEndpointPath, setEndpointHost, setHeaders, setAccessToken } from 'redux-json-api';

export default function configureStore(onCompletion:()=>void):any {
  const logger = createLogger();
  const enhancer = compose(
    applyMiddleware(thunk, promise, sequenceAction, logger),
    devTools({
      name: 'nativestarterkit', realtime: true,
    }),
  );

  const store = createStore(reducer, enhancer);
  store.dispatch(setEndpointHost('https://sam.gllu.com'));
  store.dispatch(setEndpointPath('/v1'))
  store.dispatch(setHeaders({
    'Content-Type': 'application/json',
  }));
  store.dispatch(setAccessToken('ZPIx61AMcqNv007YCYECrQtt'));
  persistStore(store, { storage: AsyncStorage }, onCompletion);

  return store;
}
