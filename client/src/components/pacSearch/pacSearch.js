import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Search, Grid, Button} from 'semantic-ui-react';


class PacSearch extends Component{

    render(){
        return (
            <div>
                <Grid centered>
                    <Grid.Row>
                        <Search placeholder='Car, Tag, or Phone #' />
                    </Grid.Row>
                </Grid>
                </div>
        )
    }
}
export default  PacSearch;