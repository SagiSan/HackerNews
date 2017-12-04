import { applyMiddleware, createStore, compose } from "redux";

import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import reducer from "./reducers";
import * as localForage from "localforage";

localForage
  .setItem("somekey", "some value")
  .then(function(value) {
    // Do other things once the value has been saved.
    console.log(value);
  })
  .catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
  });

const logger = createLogger({
  collapsed: true,
  colors: {
    title: () => "green"
  }
});
const middleware = applyMiddleware(promiseMiddleware(), thunk, logger);

export default createStore(
  reducer,
  compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
