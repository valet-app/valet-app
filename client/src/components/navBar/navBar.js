import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Grid, Divider,Menu, Icon} from 'semantic-ui-react';
class NavBar extends Component{

  constructor(props){
    super(props);
  }
    render(){
      console.log(this.props)
        return (
            <Grid color="grey">
            <Grid.Row color="grey">
              <Divider clearing />
              <Menu secondary inverted>
                <Menu.Item>
                  <Icon onClick={this.props.navTitle.cb} name="arrow left" />
                  <p>{this.props.navTitle.title}</p>
                </Menu.Item>
              </Menu>
            </Grid.Row>
          </Grid>
        )
    }
}
const mapStateToProps = state => state;
export default  connect(mapStateToProps)(NavBar);