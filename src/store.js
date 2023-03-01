import { applyMiddleware, combineReducers } from "redux";
import { legacy_createStore as createStore} from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import throttle from "lodash/throttle";
import {alertReducer} from "./reducer/alert.reducer";

const middleware = [thunk];

const appReducer = combineReducers({
  alert: alertReducer,
});

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};
const peristedState = loadState();

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const store = createStore(
  rootReducer,
  peristedState,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

export default store;

