import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "../navBar/navBar";
import {
  getOpenSpacesAction,
  setNavTitleAction,
  getVehiclesAction
} from "../../reducers";
import {
  Grid,
  Button,
  Header,
  Dropdown,
  Icon,
  TextArea
} from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

class ParkCar extends Component {
  constructor(props) {
    super(props);

    const get = this.props.history.location.pathname.substring(1, 4) === "get";
    const complete =
      this.props.history.location.pathname.substr(-8) === "complete";
    this.state = {
      get,
      complete,
      spaces: { Loading: true },
      parkingspace_id: 0
    };

    if (!this.state.get) {
      this.props.getOpenSpacesAction(this.props.chosenVehicle);
    }

    this.props.setNavTitleAction("Back", () => this.props.history.goBack());

    console.log(this.state);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    // if (nextProps.openSpaces) {
    //   const spaces = nextProps.openSpaces.map(space => {
    //     return {
    //       text: `${space.location1} ${space.location2} ${space.location3} ${space.location4} ${space.location5} `,
    //       value: `${space.id}`
    //     };
    //   });
    //   if (nextProps.chosenVehicle.location1) {
    //     console.log("location there");
    //     spaces.unshift({
    //       text: `${nextProps.chosenVehicle.location1} ${nextProps.chosenVehicle
    //         .location2} ${nextProps.chosenVehicle.location3} ${nextProps
    //         .chosenVehicle.location4} ${nextProps.chosenVehicle.location5} `,
    //       value: `${nextProps.chosenVehicle.parkingspace_id}`
    //     });
    //   }
    //   const parkingspace_id = spaces.length ? spaces[0].value : 0;
    //   this.setState({
    //     spaces,
    //     selectedSpace: parkingspace_id
    //   });
    // }
  }

  handleButtonClick() {
    let newStatus;
    if (this.state.get) {
      if (this.state.complete) {
        newStatus = 5;
      } else {
        newStatus = 4;
      }
    } else {
      if (this.state.complete) {
        newStatus = 3;
      } else {
        newStatus = 2;
      }
    }

    let parkingspace_id =
      this.state.get && this.state.complete ? null : this.state.selectedSpace;
    console.log(
      newStatus,
      parkingspace_id,
      this.props.currentValet,
      this.props.chosenVehicle
    );
    console.log(parkingspace_id);
    axios
      .put(`/api/cars?id=${this.props.chosenVehicle.car_id}`, {
        status_id: newStatus,
        employee_id:
          this.props.currentValet || this.props.chosenVehicle.employee_id,
        parkingspace_id
      })
      .then(response => this.props.history.push("/home"));
  }

  handleSelect(event, data) {
    console.log(data);
    this.setState({
      selectedSpace: data.value
    });
  }

  render() {
    let yellowFlag = "off";
    return (
      <div>
        <NavBar />
        <Icon
          className="yellowFlag"
          size="large"
          name="flag"
          color="yellow"
          onClick={(yellowFlag = "on")}
        />
        <Grid centered>
          <Grid.Column verticalAlign="middle" width={12}>
            <Header as="h1" color="grey">
              Vehicle {this.props.chosenVehicle.car_id}
            </Header>
            <p className="phonenumber">{this.props.chosenVehicle.phone}</p>
            {yellowFlag == "on" ? (
              <TextArea size="large" placeholder="Add a note" />
            ) : null}
          </Grid.Column>
          <Grid.Row centered columns={2}>
            <Grid.Column
              className="white"
              computer={6}
              mobile={12}
              verticalAlign="middle"
            >
              <Header as="h3" textAlign="center">
                Parking Space
              </Header>
              {this.state.get && (
                <h3>{`${this.props.chosenVehicle.location1} ${this.props
                  .chosenVehicle.location2} ${this.props.chosenVehicle
                  .location3} ${this.props.chosenVehicle.location4} ${this.props
                  .chosenVehicle.location5} `}</h3>
              )}
              {!this.state.get && (
                <div>
                  <Dropdown
                    options={Object.keys(this.props.openSpaces)
                      .sort()
                      .map(key => {
                        return { text: key, value: key };
                      })}
                  />
                  <span>Location2</span>
                  <span>Location3</span>
                  <span>Location4</span>
                  <span>Location5</span>
                </div>
                /* <Dropdown
                  selectOnBlur={true}
                  value={this.state.selectedSpace}
                  onChange={this.handleSelect}
                  fluid
                  selection
                  className="link item active"
                  options={this.state.spaces}
                /> */
              )}

              <Grid.Row />
            </Grid.Column>
          </Grid.Row>
          <Grid.Column width={12} verticalAlign="middle">
            <Grid.Row>
              <div className="carInfo">
                <div>
                  <h1>
                    {this.props.chosenVehicle.make}{" "}
                    {this.props.chosenVehicle.model}{" "}
                  </h1>
                </div>
                <div className="flexColumn">
                  <div
                    className="colorBox"
                    style={{
                      "background-color": this.props.chosenVehicle.color
                    }}
                  />
                  <div>
                    <div className="license">
                      <small className="noMargin">license plate</small>
                      <h4 className="noMargin">
                        {this.props.chosenVehicle.licenseplate}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </Grid.Row>
          </Grid.Column>
          <Grid.Row>
            <Button onClick={this.handleButtonClick} size="large" color="grey">
              {this.state.complete
                ? "Complete"
                : this.state.get ? "Get This Car" : "Park This Car"}
            </Button>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {
  getOpenSpacesAction,
  setNavTitleAction,
  getVehiclesAction
})(ParkCar);
