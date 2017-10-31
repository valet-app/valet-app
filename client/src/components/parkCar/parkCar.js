import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Grid,
  Divider,
  Button,
  Select,
  Header,
  Menu,
  Icon
} from "semantic-ui-react";

class ParkCar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Grid color="grey">
          <Grid.Row color="grey">
            <Divider clearing />
            <Menu secondary inverted>
              <Menu.Item>
                <Icon name="arrow left" />
                <p>Park a Car</p>
                {JSON.stringify(this.props.chosenVehicle)}
              </Menu.Item>
            </Menu>
          </Grid.Row>
        </Grid>
        <Grid centered>
          <Grid.Row>
            <Header as="h1" color="grey">
              Car Name
            </Header>
          </Grid.Row>
          <Grid.Row>
            <Button color="yellow"> Add a Red Flag</Button>
          </Grid.Row>
          <Grid.Column>
            <p>Make:</p>
            <p>Model:</p>
            <p>Color:</p>
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
              <Select placeholder="Parking Spaces" type="number" options="" />
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
export default connect(mapStateToProps)(ParkCar);
