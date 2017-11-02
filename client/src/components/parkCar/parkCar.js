import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "../navBar/navBar";
import {
  getOpenSpacesAction,
  setNavTitleAction,
  getVehiclesAction
} from "../../reducers";
import { Grid, Button, Header, Dropdown } from "semantic-ui-react";
import axios from "axios";


class ParkCar extends Component {
  constructor(props) {
    super(props);

    this.props.getOpenSpacesAction(this.props.chosenVehicle);
    this.props.setNavTitleAction("Park a Car", () =>
      this.props.history.goBack()
    );

    const get = this.props.history.location.pathname.substring(1, 4) === "get";
    const complete = this.props.history.location.pathname.substr(-8) === "complete";
    this.state = {
      get,
      complete,
      spaces: [],
      parkingspace_id: 0
    }
    console.log(this.state)
   this.handleButtonClick = this.handleButtonClick.bind(this);
   this.handleSelect = this.handleSelect.bind(this);
   
  }
  componentWillReceiveProps(nextProps){
  const spaces = nextProps.openSpaces.map(space => {
    return {
    text: `${space.location1} ${space.location2} ${space.location3}`,
    value: `${space.id}`
    }
  })
  const parkingspace_id = spaces[0].value

    this.setState({
      spaces, selectedSpace: parkingspace_id
    })
  }

  handleButtonClick() {
    let newStatus;
    if (this.state.get){
      if (this.state.complete){
        newStatus = 5;
      } else {
        newStatus = 4
      }
    } else {
      if (this.state.complete){
        newStatus = 3;
      } else {
        newStatus = 2
      }
    }

    let parkingspace_id = this.state.selectedSpace
      console.log(newStatus, parkingspace_id, this.props.currentValet, this.props.chosenVehicle)
    axios
      .put(`/api/cars?id=${this.props.chosenVehicle.car_id}`, {
        status_id: newStatus,
        employee_id: this.props.currentValet || this.props.chosenVehicle.employee_id,
        parkingspace_id
      })
      .then(response => this.props.history.push("/home"));
  }

  handleSelect(event, data) {
    console.log(data)
    this.setState({
      selectedSpace: data.value
    })

  }

  render() {
  
    return (
      <div>
        <NavBar />
        <Grid centered>
          <Grid.Column verticalAlign="middle" width={12}>
            <Header as="h1" color="grey">
              Vehicle {this.props.chosenVehicle.car_id}
            </Header>
            <p className="phonenumber">{this.props.chosenVehicle.phone}</p>
          </Grid.Column>
          <Grid.Row>
            <Button color="yellow"> Add a Red Flag</Button>
          </Grid.Row>
          <Grid.Column width={12} verticalAlign="middle">
            <p className="carText">
              <b>Make:</b> {this.props.chosenVehicle.make}
            </p>
            <p className="carText">
              <b>Model:</b> {this.props.chosenVehicle.model}
            </p>
            <p className="carText">
              <b>Color:</b> {this.props.chosenVehicle.color}
            </p>
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
                <h3>{this.props.chosenVehicle.parkingspace_id}</h3>
              )}
              {!this.state.get && (
                <Dropdown selectOnBlur= {true} value={this.props.chosenVehicle.parkingspace_id || this.state.selectedSpace} onChange={this.handleSelect}  fluid selection className="link item active" options={this.state.spaces}>
                  
                </Dropdown>
              )}

              <Grid.Row />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Button onClick={this.handleButtonClick} size="large" color="grey">
            {this.state.complete ? 'Complete' :
              (this.state.get ? "Get This Car" : "Park This Car")
            }
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
