import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { getUserSessionAction } from "./reducers";
import logo from "./logo.svg";
import "./App.css";

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
import InProgress from "./components/inProgress/inProgress";

class App extends Component {
  componentWillMount() {
    if (!this.props.login.username) {
      console.log(this.props);
      this.props.getUserSessionAction();
    }
  }

  render() {
    return (
      <BrowserRouter>
        {this.props.login.username || this.props.session.username ? (
          <Switch>
            <Route path="/get/complete" component={CarDelivered} />
            <Route path="/get/start" component={ParkCar} />
            <Route path="/park/complete" component={CarParked} />
            <Route path="/park/start" component={ParkCar} />
            <Route path="/get/chooseValet" component={ChooseValet} />
            <Route path="/park/chooseValet" component={ChooseValet} />
            <Route path="/park/search" component={PacSearch} />
            <Route path="/get/search" component={PacSearch} />
            <Route path="/home" component={ValetOptions} />
            <Route path="/signupCompany" component={SignupCompany} />
            <Route path="/inProgress" component={InProgress} />
            <Route path="/" component={ValetOptions} />
            <Route path="/login" component={Login} />
          </Switch>
        ) : (
          <Route path="/" component={Login} />
        )}
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { getUserSessionAction })(App);
