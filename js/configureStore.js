
import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sequenceAction from 'redux-sequence-action';
import { persistStore, autoRehydrate } from 'redux-persist';
import reducer from './reducers';
import promise from './promise';


export default function configureStore(onCompletion:()=>void):any {
  const enhancer = composeWithDevTools(
    applyMiddleware(thunk, promise),
  );

  const store = createStore(reducer, enhancer);
  persistStore(store, { storage: AsyncStorage }, onCompletion);

  return store;
}
