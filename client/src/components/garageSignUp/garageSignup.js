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
  Input
} from "semantic-ui-react";

class GarageSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state = {
      name: "",
      address: "",
      location1: "",
      location2: "",
      location3: "",
      location4: "",
      location5: ""
    };
    this.handleGarageSignup = this.handleGarageSignup.bind(this);
  }
  //hanlde function for new garage info

  handleGarageSignup() {
    axios
      .post("/api/garage", {
        name: this.state.name,
        address: this.state.adress
      })
      .then(res => {
        console.log(res, "space");
        this.setState({ parkinglot_id: res.data[0].id });

        const {
          parkinglot_id,
          location1,
          location2,
          location3,
          location4,
          location5
        } = this.state;
        axios.post("/api/garageinfo", {
          parkinglot_id,
          location1,
          location2,
          location3,
          location4,
          location5
        });
      });
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
            <p className="defaultText">Add your Garage Information</p>

            <Grid.Column width={12} verticalAlign="middle" stretched>
              <Form>
                <Form.Field>
                  <Input
                    placeholder="Garage Name"
                    iconPosition="left"
                    icon="cube"
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </Form.Field>

                <Form.Field>
                  <Input
                    placeholder="Adress"
                    iconPosition="left"
                    icon="point"
                    onChange={e => this.setState({ address: e.target.value })}
                  />
                </Form.Field>

                <Form.Field>
                  <Input
                    placeholder="Enter Floor"
                    iconPosition="left"
                    icon="block layout"
                    onChange={e => this.setState({ location1: e.target.value })}
                  />
                </Form.Field>

                <Form.Field>
                  <Input
                    placeholder="Enter Section"
                    iconPosition="left"
                    icon="grid layout"
                    onChange={e => this.setState({ location2: e.target.value })}
                  />
                </Form.Field>

                <Form.Field>
                  <Input
                    placeholder="Enter Direction"
                    iconPosition="left"
                    icon="compass"
                    onChange={e => this.setState({ location3: e.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    placeholder="Enter location"
                    iconPosition="left"
                    icon="compass"
                    onChange={e => this.setState({ location4: e.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    placeholder="Enter Space Number"
                    iconPosition="left"
                    icon="hashtag"
                    onChange={e => this.setState({ location5: e.target.value })}
                  />
                </Form.Field>

                <Button
                  type="submit"
                  onClick={this.handleGarageSignup}
                  fluid
                  className="yellow"
                >
                  Signup{" "}
                </Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default GarageSignUp;
