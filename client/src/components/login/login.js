import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//import Action Creators
import { loginAction } from "../../reducers";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.props.loginAction(this.state.username, this.state.password);
  }
  render() {
    return <div>Login Page!</div>;
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { loginAction })(Login);
