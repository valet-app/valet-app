import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Grid, Icon, Divider} from 'semantic-ui';
import NavBar from '../navBar/navBar';

import {setNavTitleAction } from "../../reducers";

class InProgress extends Component{
    constructor(props) {
        super(props);
        this.props.setNavTitleAction("InProgess", () =>
          this.props.history.goBack()
        );}
    render(){
        return (
            <Grid>
                <NavBar/>
            </Grid>
        )
    }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {
  setNavTitleAction
});