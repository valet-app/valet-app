import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from '../navBar/navBar';
import { getOpenSpacesAction, setNavTitleAction } from "../../reducers";
import {
  Grid,
  Button,
  Select,
  Header,
} from "semantic-ui-react";

class ParkCar extends Component {
 
  constructor(props) {
    super(props);
    this.props.getOpenSpacesAction(this.props.chosenVehicle);
    this.props.setNavTitleAction('Park a Car',()=> this.props.history.goBack())
  }
  render() {
    return (
      <div>
        <NavBar/>
        <Grid centered>
          <Grid.Column verticalAlign='middle' width={12}>
            <Header as="h1" color="grey">
              Vehicle {this.props.chosenVehicle.car_id}
            </Header>
            <p className='phonenumber'>
              {this.props.chosenVehicle.phone}
            </p>
            </Grid.Column>
          <Grid.Row>
            <Button color="yellow"> Add a Red Flag</Button>
          </Grid.Row>
          <Grid.Column width={12} verticalAlign='middle'>
            <p className='carText'><b>Make:</b> {this.props.chosenVehicle.make}</p>
            <p className='carText'><b>Model:</b> {this.props.chosenVehicle.model}</p>
            <p className='carText'><b>Color:</b> {this.props.chosenVehicle.color}</p>
          </Grid.Column>
          <Grid.Row centered columns={2}>
            <Grid.Column
              className="white"
              computer={6}
              mobile={12}
              verticalAlign="middle"
            >
              <Header as="h3" textAlign="center">
                Choose a Parking Space
              </Header>
              <Select placeholder="Parking Spaces" type="number" options={this.props.openSpaces} />
              <Grid.Row />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Button size="large" color="grey">
              Park This Car
            </Button>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { getOpenSpacesAction, setNavTitleAction })(ParkCar);
