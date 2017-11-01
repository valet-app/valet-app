import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Icon, Divider, Segment, Item } from "semantic-ui-react";
import NavBar from "../navBar/navBar";

import { connect } from "react-redux";
import { setNavTitleAction } from "../../reducers";

class InProgress extends Component {
  constructor(props) {
    super(props);
    this.props.setNavTitleAction("In Progress", () =>
      this.props.history.goBack()
    );
  }
  render() {
    return (
      <div>
        <NavBar />
        <br/>
        <Grid padded="vertically" centered>
          <Grid.Row className='inprogress'>
            <Grid.Column width={4}>
            <p className='progressText'>Jacob Eason</p>
            </Grid.Column>
            <Grid.Column width={6}>
            <p className='progressText'>Honda Accord</p>
            </Grid.Column>
            <Grid.Column width={4}>
               <span className='progressText'><Icon name='circle' color='red' className='blur'/>Retrieve</span>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className='inprogress'>
            <Grid.Column width={4}>
            <p className='progressText'>Jake Fromm</p>
            </Grid.Column>
            <Grid.Column width={6}>
               <p className='progressText'>Mercedes-Benz E-Class</p>
            </Grid.Column>
            <Grid.Column width={4}>
               <span className='progressText'><Icon name='circle' color='orange' className='blur'/>Park</span>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {
  setNavTitleAction
})(InProgress);
