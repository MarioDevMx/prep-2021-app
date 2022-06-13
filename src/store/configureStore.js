import {createStore, compose, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './reducers';

let composeEnhancers = compose;

// if (__DEV__) { // TODO move this var to .env file
if (true) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(Reducers, composeEnhancers(applyMiddleware(ReduxThunk)));
};

export default configureStore;