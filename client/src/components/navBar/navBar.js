import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class navBar extends Component{

    render(){
        return (
            <Grid color="grey">
            <Grid.Row color="grey">
              <Divider clearing />
              <Menu secondary inverted>
                <Menu.Item>
                  <Icon name="arrow left" />
                  <p></p>
                </Menu.Item>
              </Menu>
            </Grid.Row>
          </Grid>
        )
    }
}
const mapStateToProps = state => state;
export default  connect(mapStateToProps)(navBar);