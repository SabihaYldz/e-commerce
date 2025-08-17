import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';

// Example placeholder reducer (can be replaced with real reducers later)
const placeholder = (state = { ready: true }, _action) => state;

const rootReducer = combineReducers({
  app: placeholder,
});

// Redux DevTools support
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
