import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise-middleware";

import reducers from "./reducers";
import registerServiceWorker from "./registerServiceWorker";

//imported components - James
import Login from './components/login/login';
import ValetOptions from './components/valetGaragePage/valetGarage';
import PacSearch from './components/pacSearch/pacSearch';
import ChooseValet from './components/chooseValet/chooseValet';




const createStoreWithMiddelware = applyMiddleware(promise())(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddelware(reducers)}>
    <BrowserRouter>
      <Switch>
      <Route path="/chooseValet" component={ChooseValet} />        
      <Route path="/pacSearch" component={PacSearch} />
      <Route path="/valetOptions" component={ValetOptions} />
      <Route path="/login" component={Login} />
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
