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
  Dropdown
} from "semantic-ui-react";
import axios from 'axios';

class ParkCar extends Component {
 
  constructor(props) {
    super(props);
    this.props.getOpenSpacesAction(this.props.chosenVehicle);
    this.props.setNavTitleAction('Park a Car',()=> this.props.history.goBack())

    this.state = (this.props.history.location.pathname.substring(1, 4) === "get") ? {get: true} :{get:false}
    this.handleButtonClick = this.handleButtonClick.bind(this);
    console.log(this.props)
  }

     handleButtonClick(){
       axios.put(`/api/cars?id=${this.props.chosenVehicle.car_id}`, {
         status_id: '2',
         employee_id: this.props.currentValet,
         parkingspace_id: this.state.selectedSpace.id

       }).then(response => this.props.history.push("/home"))
    }


  render() {
    console.log(this.props.openSpaces);
    const spacesJsx = this.props.openSpaces.map( (space) => <Dropdown.Item onClick={() => this.setState({selectedSpace: space})}> {space.location1} {space.location2} {space.location3}  {space.arkinglot_id} {space.parkingspacetype_id} </Dropdown.Item> );
    
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
                 Parking Space
              </Header>
    {!this.state.get && (<Dropdown text="choose a space" className="link item">
    <Dropdown.Menu> 
      {spacesJsx}
          
        </Dropdown.Menu>
    </Dropdown>)}
    
              <Grid.Row />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Button onClick={this.handleButtonClick} size="large" color="grey">
              {this.state.get ? "Get ":"Park "}
              This Car
            </Button>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { getOpenSpacesAction, setNavTitleAction })(ParkCar);
