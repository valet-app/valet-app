import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from "../navBar/navBar";
import { Search, Grid, Button, Segment, Header } from "semantic-ui-react";
import PropTypes from "prop-types";

import _ from "lodash";
import { chooseVehicleAction, setNavTitleAction } from "../../reducers";

class PacSearch extends Component {
  constructor(props) {
    super(props);

    this.props.setNavTitleAction("Park a Car", () =>
      this.props.history.goBack()
    );

    ///Parking lot id will need to be dynamic instead of hard coded
    // if (this.props.history)

    if (this.props.history.location.pathname.substring(1, 4) === "get") {
      const parkedVehicles = this.props.vehicles.filter(
        vehicle => vehicle.parkinglot_id === 1
      );
      this.state = { value: "", get: true, vehicles: parkedVehicles };
    } else {
      const unparkedVehicles = this.props.vehicles.filter(
        vehicle => !vehicle.parkinglot_id
      );
      this.state = { value: "", get: false, vehicles: unparkedVehicles };
    }
  }

  handleResultSelect = (e, { result }) => {
    console.log(result);
    this.props.chooseVehicleAction(result);
    this.props.history.push("start");
  };

  handleSearchChange = (e, { value }) => {
    // if (this.state.value.length < 1) return this.resetComponent();
    this.setState({ isLoading: true, value });
    const re = new RegExp(_.escapeRegExp(this.state.value), "i");
    const isMatch = result => {
      return re.test(
        `${result.make}${result.model}${result.licenseplate}${result.phone}`
      );
    };

    this.setState({
      isLoading: false,
      results: _.filter(this.state.vehicles, isMatch)
    });
  };

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <div>
        <NavBar />
        <Grid centered padded="vertically">
          <Grid.Row>
            <Header as="h2" color="grey">
              Search For Car
            </Header>
          </Grid.Row>
          <Search
            placeholder="Car, Tag, or Phone #"
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            loading={isLoading}
            value={value}
            resultRenderer={({ make, licenseplate, model, car_id, phone }) => {
              return (
                <Segment.Group horizontal key={car_id}>
                  <Segment>
                    {make} {model}
                    <br />
                    <small>{licenseplate}</small>
                  </Segment>
                  <Segment>{phone}</Segment>
                </Segment.Group>
              );
            }}
          />
          <Grid.Row>
            <Button size="large" color="grey">
              Add a New Car
            </Button>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, {
  chooseVehicleAction,
  setNavTitleAction
})(PacSearch);
