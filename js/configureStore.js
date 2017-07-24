
import { AsyncStorage } from 'react-native';
//import devTools from 'remote-redux-devtools';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import sequenceAction from 'redux-sequence-action';
import { persistStore } from 'redux-persist';
import reducer from './reducers';
import promise from './promise';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;


const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});


export default function configureStore(onCompletion:()=>void):any {
  const enhancer = composeWithDevTools(
    applyMiddleware(thunk, promise, sequenceAction, logger),
  );



  const store = createStore(reducer, enhancer);
  persistStore(store, { storage: AsyncStorage }, onCompletion);

  return store;
}
