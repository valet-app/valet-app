import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from "../navBar/navBar";
import CarInfo from '../carInfo/carInfo';
import { Search, Grid, Button, Header } from "semantic-ui-react";

import _ from "lodash";
import { chooseVehicleAction, setNavTitleAction } from "../../reducers";

class PacSearch extends Component {
  constructor(props) {
    super(props);
   
  
    ///Parking lot id will need to be dynamic instead of hard coded
    // if (this.props.history)

    if (this.props.history.location.pathname.substring(1, 4) === "get") {
      const parkedVehicles = this.props.vehicles.filter(
        vehicle => vehicle.parkinglot_id === 1
      );
      this.state = { value: "", get: true, vehicles: parkedVehicles};
    } else {
      const unparkedVehicles = this.props.vehicles.filter(
        vehicle => !vehicle.parkinglot_id
      );
      this.state = { value: "", get: false, vehicles: unparkedVehicles};
    }
    this.props.setNavTitleAction('Choose a Valet', () =>
    this.props.history.goBack()
  );
  }

  componentDidMount() {
    if (!this.props.employees) this.props.history.push("/home");
  }

  handleResultSelect = (e, { result }) => {
    this.props.chooseVehicleAction(result);
  };

  handleSearchChange = (e, { value }) => {
    // if (this.state.value.length < 1) return this.resetComponent();
    this.setState({ isLoading: true, value });
    const split = _.escapeRegExp(value).split(" ");
    const regex = split.map(word => (word = "(?:" + word + ")+.*")).join("");

    const re = new RegExp(regex, "i");

    const isMatch = result => {
      return re.test(
        ` ${result.make} ${result.model} ${result.licenseplate} ${result.phone}`
      );
    };

    this.setState({
      isLoading: false,
      results: _.filter(this.state.vehicles, isMatch)
    });
  };

  render() {
    const addCar = this.props.history.location.pathname;
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
            resultRenderer={({ make, licenseplate, model, car_id, phone, firstname,lastname }) => {
              return (
                <div className='searchResult' key={car_id}>
                <div className='searchCar'>
                  <div><p className='noMargin searchText'>{make} {model}</p></div>
                  <div><small>{licenseplate}</small></div>
                </div>
                <div className='searchUser'>
                <div><p className='noMargin searchText'>{phone}</p></div>
                <div><small>{firstname} {lastname}</small></div>
              </div>
              </div>
              );
            }}
          />
          {addCar === '/park/search' && !this.props.chosenVehicle ? <Grid.Row>
            <Link to='/addCar'><Button size="large" color="grey">
              Add a New Car
            </Button></Link>
          </Grid.Row>
          :null}
          {this.props.chosenVehicle && (
            <Grid.Row>
              <Grid.Column width={12} verticalAlign="middle">
              <CarInfo vehicle={this.props.chosenVehicle}/>
                <Button color='yellow' size='large' onClick={() => this.props.history.push("start")}>
                  Confirm
                </Button>
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
        {/* <div className='searchResult' horizontal>
                  <div className='searchCar'>
                    <div><p className='carText noMargin'>Honda Accord</p></div>
                    <div>test</div>
                  </div>
                  <div className='searchUser'>
                  <div><p className='carText noMargin'>Honda Accord</p></div>
                  <div>test</div>
                </div>
                </div>*/}
      </div> 
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, {
  chooseVehicleAction,
  setNavTitleAction
})(PacSearch);
