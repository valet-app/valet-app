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
  TextArea,
  Form,
  Message
} from "semantic-ui-react";
import axios from "axios";
import CarInfo from "../carInfo/carInfo";

class ParkCar extends Component {
  constructor(props) {
    super(props);

    const get = this.props.history.location.pathname.substring(1, 4) === "get";
    const complete =
      this.props.history.location.pathname.substr(-8) === "complete";
    this.state = {
      get,
      complete,
      spaces: [],
      parkingspace_id: 0,
      yellowFlag: false,
      notes: "",
      noteConfirm: false
    };

    if (!this.state.get) {
      this.props.getOpenSpacesAction(this.props.chosenVehicle);
    }

    this.props.setNavTitleAction("Back", () => this.props.history.goBack());

    console.log(this.state);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleNotesButton = this.handleNotesButton.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.openSpaces) {
      const spaces = nextProps.openSpaces.map(space => {
        return {
          text: `${space.location1} ${space.location2} ${space.location3} ${space.location4} ${space.location5} `,
          value: `${space.id}`
        };
      });

      if (nextProps.chosenVehicle.location1) {
        console.log("location there");
        spaces.unshift({
          text: `${nextProps.chosenVehicle.location1} ${nextProps.chosenVehicle
            .location2} ${nextProps.chosenVehicle.location3} ${nextProps
            .chosenVehicle.location4} ${nextProps.chosenVehicle.location5} `,
          value: `${nextProps.chosenVehicle.parkingspace_id}`
        });
      }

      const parkingspace_id = spaces.length ? spaces[0].value : 0;

      this.setState({
        spaces,
        selectedSpace: parkingspace_id
      });
    }
  }
  handleNotesButton() {
    axios
      .post(`/api/carnotes`, {
        car_id: this.props.chosenVehicle.car_id,
        notes: this.state.notes
      })
      .then(result =>
        this.setState({
          noteConfirm: !this.state.noteConfirm,
          yellowFlag: !this.state.yellowFlag
        })
      );
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
    return (
      <div>
        <NavBar />
        <Icon
          className="yellowFlag"
          size="large"
          name="flag"
          color="yellow"
          onClick={e =>
            this.setState({
              yellowFlag: !this.state.yellowFlag,
              noteConfirm: false
            })}
        />
        <Grid centered>
          <Grid.Column verticalAlign="middle" width={12}>
            <Header as="h1" color="grey">
              Vehicle {this.props.chosenVehicle.car_id}
            </Header>
            <p className="phonenumber">{this.props.chosenVehicle.phone}</p>
            {this.state.yellowFlag && (
              <Form>
                <TextArea
                  size="large"
                  placeholder="Add a note"
                  onChange={e => this.setState({ notes: e.target.value })}
                />
                <Form.Field>
                <br />
                <Button color="yellow" onClick={this.handleNotesButton}>
                  Add Note
                </Button>
                </Form.Field>
              </Form>
            )}
            {this.state.noteConfirm && <Message success>Note Added</Message>}
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
                <Dropdown
                  selectOnBlur={true}
                  value={this.state.selectedSpace}
                  onChange={this.handleSelect}
                  fluid
                  selection
                  className="link item active"
                  options={this.state.spaces}
                />
              )}

              <Grid.Row />
            </Grid.Column>
          </Grid.Row>
          <Grid.Column width={12} verticalAlign="middle">
            <Grid.Row>
              <CarInfo vehicle={this.props.chosenVehicle} />
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
