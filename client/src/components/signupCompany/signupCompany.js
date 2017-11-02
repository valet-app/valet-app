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

class SignupCompany extends Component {
  constructor(props) {
    super(props);
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
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup() {
    !this.state.error ? console.log("yes") : console.log("no");

    this.state.password !== this.state.confirmpassword
      ? this.setState({ matchpass: false })
      : axios
          .post(`/api/company`, { name: this.state.newCompanyName })
          .then(result => {
            this.setState({ company_id: result.data[0].id });
            //After company has been added, add the employee
            const { company_id, username, name, admin, password } = this.state;
            axios
              .post(`/api/empl`, {
                company_id,
                username,
                name,
                admin,
                password
              })
              .then(result => {
                this.props.history.push("/login");
              });
          });
  }

  handleCheck(e) {
    console.log(e.target.checked);
  }

  render() {
    return (
      <div className="ui grid centered">
        <br />
        <Grid centered padding="vertically" verticalAlign="middle">
          <Grid.Row centered>
            <Image src={logo} style={{ width: "75px", height: "75px" }} />
            <Header size="huge" color="grey">
              Company Signup
            </Header>
          </Grid.Row>

          <Grid.Row columns={2} stretched centered>
            <p className="defaultText">
              Add your Company and Create Initial User
            </p>

            <Grid.Column width={12} verticalAlign="middle" stretched>
              <Form>
                <Form.Field>
                  <Input
                    placeholder="Company Name"
                    iconPosition="left"
                    icon="cube"
                    onChange={e =>
                      this.setState({ newCompanyName: e.target.value })}
                  />
                </Form.Field>

                <Form.Field>
                  <Input
                    placeholder="Name"
                    iconPosition="left"
                    icon="user"
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </Form.Field>

                <Form.Field>
                  <Input
                    placeholder="Username"
                    iconPosition="left"
                    icon="user"
                    onChange={e => this.setState({ username: e.target.value })}
                  />
                </Form.Field>

                <Form.Field>
                  <Input
                    placeholder="Password"
                    type="password"
                    iconPosition="left"
                    icon="lock"
                    onChange={e =>
                      this.setState({
                        password: e.target.value,
                        matchpass: true
                      })}
                  />
                </Form.Field>

                <Form.Field>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    iconPosition="left"
                    icon="lock"
                    onChange={e =>
                      this.setState({
                        confirmpassword: e.target.value,
                        matchpass: true
                      })}
                  />
                </Form.Field>

                <Form.Field>
                  <Checkbox
                    className="defaultText"
                    label="I agree to the Terms and Conditions"
                  />
                </Form.Field>

                {!this.state.matchpass ? (
                  <Grid.Row>
                    <Message floating negative>
                      <Message.Header>Passwords Do Not Match</Message.Header>
                      <p>Please reenter passwords.</p>
                    </Message>
                    <Divider clearing />
                  </Grid.Row>
                ) : null}

                <Button
                  type="submit"
                  onClick={this.handleSignup}
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
export default connect(mapStateToProps, {})(SignupCompany);
