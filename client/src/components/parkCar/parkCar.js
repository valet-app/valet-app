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
import SelectSpaces from "./selectSpaces/selectSpaces.js";

class ParkCar extends Component {
  constructor(props) {
    super(props);

    const get = this.props.history.location.pathname.substring(1, 4) === "get";
    const complete =
      this.props.history.location.pathname.substr(-8) === "complete";
    this.state = {
      get,
      complete,
      openSpaces: this.props.openSpaces,
      parkingspace_id: 0,
      yellowFlag: false,
      notes: "",
      noteConfirm: false,
      newNote: []
    };

    this.props.setNavTitleAction("Back", () => this.props.history.goBack());
    this.props.getOpenSpacesAction(this.props.chosenVehicle);

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleNotesButton = this.handleNotesButton.bind(this);
  }

  handleNotesButton() {
    axios
      .post(`/api/carnotes`, {
        car_id: this.props.chosenVehicle.car_id,
        notes: this.state.notes
      })
      .then(result =>
        { console.log('result', result.data)
        this.setState({
          noteConfirm: !this.state.noteConfirm,
          yellowFlag: !this.state.yellowFlag,
          newNote: result.data
        })}
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
      this.state.get && this.state.complete
        ? null
        : this.props.chosenSpace || this.props.chosenVehicle.parkingspace_id;
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

  componentWillReceiveProps(nextProps) {
    this.setState({ openSpaces: nextProps.openSpaces });
  }

  render() {
    console.log("STATE", this.state);
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
        <Grid centered padded="vertically">
          <Grid.Column verticalAlign="middle" width={12}>
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
            <Header as="h1" color="grey">
              Confirmation
            </Header>
            <Grid.Column
              className="parkingbox"
              computer={6}
              mobile={12}
              verticalAlign="middle"
            >
              {this.state.get && (
                <h3>{`${this.props.chosenVehicle.location1} ${this.props
                  .chosenVehicle.location2} ${this.props.chosenVehicle
                  .location3} ${this.props.chosenVehicle.location4} ${this.props
                  .chosenVehicle.location5} `}</h3>
              )}
              {!this.state.get &&
                this.props.openSpaces && (
                  <SelectSpaces
                    chosenVehicle={this.props.chosenVehicle}
                    openSpaces={this.props.openSpaces}
                    updateParent={this.updateParent}
                  />
                )}

              <Grid.Row />
            </Grid.Column>
          </Grid.Row>
          <Grid.Column width={12} verticalAlign="middle">
            <Grid.Row>
              <CarInfo vehicle={this.props.chosenVehicle} notes={this.state.newNote} />
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
