
import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sequenceAction from 'redux-sequence-action';
import { persistStore, autoRehydrate } from 'redux-persist';
import reducer from './reducers';
import promise from './promise';
import { createLogger } from 'redux-logger';

export default function configureStore(onCompletion:()=>void):any {
  const logger = createLogger();
  const enhancer = compose(
    applyMiddleware(thunk, promise, sequenceAction),
    devTools({
      name: 'nativestarterkit', realtime: true,
    }),
  );

  const store = createStore(reducer, enhancer);
  persistStore(store, { storage: AsyncStorage }, onCompletion);

  return store;
}
