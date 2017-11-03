import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Grid, Form, Header, Select, TextArea } from "semantic-ui-react";
import NavBar from "../navBar/navBar";

import { connect } from "react-redux";
import { setNavTitleAction } from "../../reducers";
const options = [
  { key: '1', text: 'Regular', value: '1' },
  { key: '2', text: 'Compact', value: '2' },
]


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
      parkingspacetype_id: "",
      color: "",
      licenseplate: "",
      valettag: "",
      notes: "",
      user_id: "",
      car_id: ""
    };
    this.handleSignup = this.handleSignup.bind(this);
    console.log(this.state)
  }
  handleSignup() {
    axios
          .post(`/api/user`, { firstname: this.state.firstname, lastname: this.state.lastname, phone: this.state.phone, email: this.state.email })
          .then(result => {
            this.setState({ user_id: result.data[0].id });
            console.log('user id:',this.state.user_id)
            //After company has been added, add the employee
            const { user_id, make, model, parkingspacetype_id, color,licenseplate, valettag} = this.state;
            axios
              .post(`/api/cars`, {
                user_id, parkingspacetype_id,make, model,licenseplate, valettag,color
              })
              .then(result => {
                this.setState({car_id: result.data[0].id});
                console.log('car id:',this.state.car_id)
              })
              // .then(result => {
              //   this.props.history.push("/login");
              // });
          });
          console.log(this.state)
        }
  onChange(e){
    console.log(e);
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
            <Form.Input icon='user'iconposition='left' placeholder="First Name" onChange={e => this.setState({ firstname: e.target.value })} />
            <Form.Input icon='user circle'iconposition='left' placeholder="Last Name" onChange={e => this.setState({ lastname: e.target.value })} />
          </Form.Group>
          <Form.Input type='email' icon='mail'iconposition='left' placeholder="Email" onChange={e => this.setState({ email: e.target.value })} />
          <Form.Input type='tel'pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={e => this.setState({ phone: e.target.value })} icon='phone'iconposition='left' placeholder="Phone Number" required/>
          <br />
          <Header color="grey">Car Information</Header>
          <Form.Group inline>
            <Form.Input  onChange={e => this.setState({ make: e.target.value })} icon='car'iconposition='left' placeholder="Make" required />
            <Form.Input  onChange={e => this.setState({ model: e.target.value })}icon='car'iconposition='left' placeholder="Model" required />
          </Form.Group>
          <Form.Group inline>
            <Form.Input icon='eyedropper' iconposition='left' placeholder="Color" onChange={e => this.setState({ color: e.target.value })} />
            <Form.Input icon='drivers license' iconposition='left' placeholder="License Plate" onChange={e => this.setState({ licenseplate: e.target.value })} />
          </Form.Group>
          <Form.Group inline>
            <Form.Input icon='tag'iconposition='left' placeholder="Valet Tag # (if applicable)" onChange={e => this.setState({ valettag: e.target.value })} />
            <Form.Field control={Select} options={options} placeholder="Parking Space Type"   value={options.value} onChange={(data) => {this.setState({ parkingspacetype_id: data.value})}} />
          </Form.Group>
          <Form.Field label="Add Any Notes About the Car" onChange={e => this.setState({ notes: e.target.value })} control={TextArea}/>
          <Form.Button color="yellow" onClick={this.handleSignup}>Submit</Form.Button>
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
