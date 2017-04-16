import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import Immutable from 'immutable';
import reducer from '../reducers/storyReducer';
import thunk from 'redux-thunk';

const logger = createLogger({
  actionTransformer: action => Immutable.Map(action).toJS(),
  stateTransformer: state => Immutable.Map(state).toJS(),
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducer,
  undefined,
  composeEnhancers(applyMiddleware(
    thunk,
    logger
  ))
);
