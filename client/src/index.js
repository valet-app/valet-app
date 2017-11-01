import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise-middleware";
import "./semantic/dist/semantic.min.css";

import reducers from "./reducers";
import registerServiceWorker from "./registerServiceWorker";

//imported components - James
import Login from "./components/login/login";
import ValetOptions from "./components/valetGaragePage/valetGarage";
import PacSearch from "./components/pacSearch/pacSearch";
import ChooseValet from "./components/chooseValet/chooseValet";
import ParkCar from "./components/parkCar/parkCar";
import CarParked from "./components/carParked/carParked";
import GetCar from "./components/getCar/getCar";
import GetCarSearch from "./components/getCarSearch/getCarSearch";
import CarDelivered from "./components/carDelivered/carDelivered";
import SignupCompany from "./components/signupCompany/signupCompany";

const createStoreWithMiddelware = applyMiddleware(promise())(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddelware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path="/get/complete" component={CarDelivered} />
        <Route path="/get/inProgress" component={GetCar} />
        <Route path="/park/complete" component={CarParked} />
        <Route path="/park/inProgress" component={ParkCar} />
        <Route path="/get/chooseValet" component={ChooseValet} />
        <Route path="/park/chooseValet" component={ChooseValet} />
        <Route path="/park/search" component={PacSearch} />
        <Route path="/get/search" component={PacSearch} />
        <Route path="/home" component={ValetOptions} />
        <Route path="/login" component={Login} />
        <Route path="/signupCompany" component={SignupCompany} />
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
