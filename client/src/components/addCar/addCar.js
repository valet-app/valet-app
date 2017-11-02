import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Form, Header } from "semantic-ui-react";
import NavBar from "../navBar/navBar";

import { connect } from "react-redux";
import { setNavTitleAction } from "../../reducers";

class AddCar extends Component {
  constructor(props) {
    super(props);
    this.props.setNavTitleAction("Add a Car", () =>
      this.props.history.goBack()
    );
    this.state = {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      make: "",
      model: "",
      year: "",
      color: "",
      license: "",
      valettag: "",
    };
  }
  render() {
    return (
      <div>
        <NavBar />
        <br />
        <br />
        <Grid centered verticalAlign='middle' width={12}>
        <Grid.Row>
        <Form>
          <Header color="grey">Owner Information</Header>
          <Form.Group inline>
            <Form.Input icon='user'iconPosition='left' placeholder="First Name" />
            <Form.Input icon='user circle'iconPosition='left' placeholder="Last Name" />
          </Form.Group>
          <Form.Input type='email' icon='mail'iconPosition='left' placeholder="Email" />
          <Form.Input type='tel'pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" icon='phone'iconPosition='left' placeholder="Phone Number" required/>
          <br />
          <Header color="grey">Car Information</Header>
          <Form.Group inline>
            <Form.Input icon='car'iconPosition='left' placeholder="Make" required />
            <Form.Input icon='car'iconPosition='left' placeholder="Model" required />
          </Form.Group>
          <Form.Group inline>
            <Form.Input icon='calendar'iconPosition='left' placeholder="Year" />
            <Form.Input icon='drivers license' iconPosition='left' placeholder="License Plate" />
          </Form.Group>
          <Form.Group inline>
            <Form.Input icon='tag'iconPosition='left' placeholder="Valet Tag # (if applicable)" />
            <Form.Input icon='eyedropper' iconPosition='left' placeholder="Color" />
          </Form.Group>
          <Form.Button color="yellow">Submit</Form.Button>
        </Form>
        </Grid.Row>
        </Grid>
        <br />
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {
  setNavTitleAction
})(AddCar);
