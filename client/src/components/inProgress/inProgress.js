import React, { Component } from "react";
import { Grid, Icon } from "semantic-ui-react";
import NavBar from "../navBar/navBar";

import { connect } from "react-redux";
import { setNavTitleAction, chooseVehicleAction } from "../../reducers";

class InProgress extends Component {
  INCOMING = 2;
  OUTGOING = 4;
  constructor(props) {
    super(props);
    this.props.setNavTitleAction("Home", () =>
      this.props.history.goBack()
    );

    let carsInProgress = this.props.vehicles.filter(
      vehicle =>
        vehicle.status_id === this.OUTGOING ||
        vehicle.status_id === this.INCOMING
    );

    this.state = {
      carsInProgress
    };
  }

  handleClick(car, e) {
    this.props.chooseVehicleAction(car);
    if (car.status_id === this.INCOMING) {
      this.props.history.push("/park/complete");
    } else if (car.status_id === this.OUTGOING) {
      this.props.history.push("/get/complete");
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <br />
        <Grid padded="vertically" centered>
          {this.state.carsInProgress.map(car => (
            <Grid.Row
              className="inprogress"
              onClick={e => this.handleClick(car, e)}
            >
              <Grid.Column width={4}>
                <p className="progressText">
                  {car.firstname} {car.lastname}
                </p>
              </Grid.Column>
              <Grid.Column width={6}>
                <p className="progressText">
                  {car.make} {car.model}
                </p>
              </Grid.Column>
              <Grid.Column width={4}>
                <span className="progressText">
                  <Icon
                    name="circle"
                    color={car.status_id === 2 ? "orange" : "red"}
                    className="blur"
                  />
                  {/* Status IDs are magic numbers...where can we save them so it's easier to update? */}
                  {car.status_id === 2 ? "Park" : "Retrieve"}
                </span>
              </Grid.Column>
            </Grid.Row>
          ))}
          {!this.state.carsInProgress.length && (
            <p className='carText'>No vehicles currently in progress.</p>
          )}
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {
  setNavTitleAction,
  chooseVehicleAction
})(InProgress);
