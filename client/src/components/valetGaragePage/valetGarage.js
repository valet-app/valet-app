import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getVehiclesAction } from "../../reducers";

class ValetOptions extends Component {
  constructor(props) {
    super(props);

    this.getVehicles = this.getVehicles.bind(this);
  }

  componentDidMount() {
    this.props.getVehicles();
  }

  render() {
    return <div>Valet-Garage Page!</div>;
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { getVehiclesAction })(ValetOptions);
