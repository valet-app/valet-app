import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../../valet-logo.png";

import {
  Form,
  Button,
  Input,
  Header,
  Grid,
  Image,
  Divider
} from "semantic-ui-react";

//import Action Creators
import { loginAction } from "../../reducers";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.props.loginAction(
      {
        username: this.state.username,
        password: this.state.password
      },
      () => this.props.history.push("/home")
    );
  }
  render() {
    return (
      <div className="ui grid centered">
        <Divider clearing />
        <Grid.Row>
          <Image
            src={logo}
            className="ui image"
            style={{ width: "200px", height: "200px" }}
            alt="logo"
            centered
          />
        </Grid.Row>
        <Grid.Row>
          <Header as="h2" color="grey">
            Log into Your Account
          </Header>
          <Divider clearing />
        </Grid.Row>
        <Grid centered padded="horizontally">
          <Grid.Row>
            <Grid.Column color="grey" width={12}>
              <Form>
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
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                </Form.Field>
                <Button
                  type="submit"
                  onClick={this.handleLogin}
                  fluid
                  className="yellow"
                >
                  Login
                </Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Button color="grey" basic>
              New to Us? Sign Up
            </Button>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { loginAction })(Login);
