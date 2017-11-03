import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "../navBar/navBar";
import { chooseValetAction, setNavTitleAction } from "../../reducers";
import {
  Grid,
  Header,
  Segment,
  Button,
  Search,
  Dropdown,
  Radio
} from "semantic-ui-react";

class ValetSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenValet: ""
    };
    this.handleValetClick = this.handleValetClick.bind(this);
  }

  handleValetClick(valet) {
    this.props.chooseValetAction(valet);
  }
  renderValet(valet) {
    return (
      <Grid.Row>
        <Grid.Row>
          <Header as="h2">{valet}</Header>
        </Grid.Row>
        <Grid.Row>
          <span>
            <Radio toggle />
          </span>
        </Grid.Row>
      </Grid.Row>
    );
  }

  render() {
    console.log(this.props.employees);
    const valets = this.props.employees.map(valet => {
      return valet.name;
    });

    console.log("valets", valets);
    return (
      <Grid padded="vertically" centered>
        <Header as="h1"> Valet Sign-In </Header>
        <Grid.Row>
          <Search placeholder="Search " />
        </Grid.Row>

        <Grid.Column width={12}>
        {valets.map(valet => this.renderValet(valet))}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(ValetSignIn);
