import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import promise from "redux-promise-middleware";
import "./semantic/dist/semantic.min.css";

import reducers from "./reducers";
import registerServiceWorker from "./registerServiceWorker";

//imported components - James

const createStoreWithMiddelware = applyMiddleware(promise())(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddelware(reducers)}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
