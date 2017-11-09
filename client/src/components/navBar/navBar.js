import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Icon, Menu } from "semantic-ui-react";
class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar">
        {/* <Grid color="grey"> */}
        {/* <Grid.Row color="grey" className="height"> */}
        {/* <Grid.Row className="backArrow"> */}
        <Icon
          onClick={this.props.navTitle.cb}
          name="arrow left"
          className="nav-icon"
        />
        <span>{this.props.navTitle.title}</span>
        {/* </Grid.Row> */}
        {/* </Grid.Row> */}
        {/* </Grid> */}
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(NavBar);
