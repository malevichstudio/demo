import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import * as reducers from './reducers';


const rootReducers = combineReducers({
  ...reducers,
});

const middleware = [thunk];
const middlewareEnhancer = applyMiddleware(...middleware);

const store = createStore(rootReducers, composeWithDevTools(middlewareEnhancer));



export default store;