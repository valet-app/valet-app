import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Divider, Menu, Icon, Modal, TextArea } from "semantic-ui-react";
class NavBar extends Component {
  render() {
    return (
      <Grid color="grey">
        <Grid.Row color="grey" className='height'>
          <Grid.Row className='backArrow'>
          <Icon onClick={this.props.navTitle.cb} name="arrow left" />
          <span>{this.props.navTitle.title}</span>
          </Grid.Row>
        </Grid.Row>
      </Grid>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(NavBar);
