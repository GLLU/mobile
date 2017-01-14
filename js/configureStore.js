
import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sequenceAction from 'redux-sequence-action';
import { persistStore } from 'redux-persist';
import reducer from './reducers';
import promise from './promise';
import { setEndpointPath, setEndpointHost, setHeaders } from 'redux-json-api';

export default function configureStore(onCompletion:()=>void):any {
  const enhancer = compose(
    applyMiddleware(thunk, promise, sequenceAction),
    devTools({
      name: 'nativestarterkit', realtime: true,
    }),
  );

  const store = createStore(reducer, enhancer);
  store.dispatch(setEndpointHost('https://sam.gllu.com'));
  store.dispatch(setEndpointPath('/v1'))
  store.dispatch(setHeaders({
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json'
  }));
  persistStore(store, { storage: AsyncStorage }, onCompletion);

  return store;
}
