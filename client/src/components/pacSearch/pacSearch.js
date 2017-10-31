import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Search, Grid, Button} from 'semantic-ui-react';


class PacSearch extends Component{

    render(){
        return (
            
                <Grid centered padded='vertically'verticalAlign='bottom' stretched>
                    <Grid.Row>
                        <Search size='huge' placeholder='Car, Tag, or Phone #' />
                    </Grid.Row>
                </Grid>
                
        )
    }
}
export default  PacSearch;