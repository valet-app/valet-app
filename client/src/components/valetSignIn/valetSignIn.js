import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../navBar/navBar";
import { chooseValetAction, setNavTitleAction } from "../../reducers";
import {
  Grid,
  Header,
  Button,
  Search,
  Radio,
  Sidebar, 
  Icon, 
  Menu
} from "semantic-ui-react";

class ValetSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenValet: ""
    };
    this.handleValetClick = this.handleValetClick.bind(this);
  }
  state = { visible: false }
  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  handleValetClick(valet) {
    this.props.chooseValetAction(valet);
  }
  renderValet(valet) {
    const { visible } = this.state
    return (
      <div>
      <Grid.Row>
        <Grid.Row>
          <h2 className="valetList">
            <div>{valet}</div>
            {/* <div> */}
            <Radio toggle />
            {/* </div> */}
          </h2>
        </Grid.Row>
      </Grid.Row>
      </div>
    );
  }

  render() {
    console.log(this.props.employees);
    const valets = this.props.employees.map(valet => {
      return valet.name;
    })
  const { visible } = this.state
    ;

    console.log("valets", valets);
    return (

      <Grid padded="vertically" centered>
        <Header as="h1" className="grey">
          {" "}
          Valet Sign-In{" "}
        </Header>
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
