import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import logo from "../../valet-logo.png";
import {
  Header,
  Button,
  Grid,
  Image,
  Form,
  Checkbox,
  Input,
  Message,
  Divider
} from "semantic-ui-react";

class GarageSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state = {
        newCompanyName: "",
        company_id: "",
        username: "",
        name: "",
        admin: true,
        password: "",
        confirmpassword: "",
        matchpass: true,
        error: "",
        accept: false
      };
      this.handleGarageSignup = this.handleGarageSignup.bind(this);
  }
    //hanlde function for new garage info 
  handleGarageSignup(){

  }
  render() {
    return (
      <div className="ui grid centered">
        <br />
        <Grid centered padding="vertically" verticalAlign="middle">
          <Grid.Row centered>
            <Image src={logo} style={{ width: "75px", height: "75px" }} />
            <Header size="huge" color="grey">
              Garage Signup
            </Header>
          </Grid.Row>

          <Grid.Row columns={2} stretched centered>
            <p className="defaultText">
              Add your Garage Information
            </p>

          <Grid.Column width={12} verticalAlign="middle" stretched>
            <Form />
            <Form.Field>
                  <Input
                    placeholder="Garage Name"
                    iconPosition="left"
                    icon="cube"
                    onChange={e =>
                      this.setState({ newCompanyName: e.target.value })}
                  />
                </Form.Field>

                <Form.Field>
                  <Input
                    placeholder="Adress"
                    iconPosition="left"
                    icon="point"
                    onChange={e => this.setState({ username: e.target.value })}
                  />
                </Form.Field>

                <Form.Field>
                  <Input
                    placeholder="Enter Floor"
                    type="password"
                    iconPosition="left"
                    icon="block layout"
                    onChange={e =>
                      this.setState({
                        password: e.target.value,
                        matchpass: true
                      })}
                  />
                </Form.Field>

                <Form.Field>
                  <Input
                    placeholder="Enter Section"
                    type="password"
                    iconPosition="left"
                    icon="grid layout"
                    onChange={e =>
                      this.setState({
                        confirmpassword: e.target.value,
                        matchpass: true
                      })}
                  />
                </Form.Field>


                <Form.Field>
                  <Input
                    placeholder="Enter Direction"
                    type="password"
                    iconPosition="left"
                    icon="compass"
                    onChange={e =>
                      this.setState({
                        confirmpassword: e.target.value,
                        matchpass: true
                      })}
                  />
                </Form.Field>

                <Form.Field>
                  <Input
                    placeholder="Enter Space Number"
                    type="password"
                    iconPosition="left"
                    icon="hashtag"
                    onChange={e =>
                      this.setState({
                        confirmpassword: e.target.value,
                        matchpass: true
                      })}
                  />
                </Form.Field>

                <Button
                  type="submit"
                  onClick={this.handleSignup}
                  fluid
                  className="yellow"
                >
                  Signup{" "}
                </Button>


          </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
export default GarageSignUp;
