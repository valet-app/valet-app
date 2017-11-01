import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Icon, Form, Header } from "semantic-ui-react";
import NavBar from "../navBar/navBar";

import { connect } from "react-redux";
import { setNavTitleAction } from "../../reducers";

class AddCar extends Component {
  constructor(props) {
    super(props);
    this.props.setNavTitleAction("Add a Car", () =>
      this.props.history.goBack()
    );
  }
  render() {
    return (
      <div>
        <NavBar />
        <br />
        <br />
        <Form>
          <Header color="grey">Owner Information</Header>
          <Form.Group inline>
            <Form.Input placeholder="First Name" />
            <Form.Input placeholder="Last Name" />
          </Form.Group>
          <Form.Input placeholder="Email" />
          <Form.Input placeholder="Phone Number" />
          <br />
          <Header color="grey">Car Information</Header>
          <Form.Group inline>
            <Form.Input placeholder="Make" />
            <Form.Input placeholder="Model" />
          </Form.Group>
          <Form.Group inline>
            <Form.Input placeholder="Year" />
            <Form.Input placeholder="Color" />
          </Form.Group>
          <Form.Button color="yellow">Submit</Form.Button>
        </Form>
        <br />
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {
  setNavTitleAction
})(AddCar);
