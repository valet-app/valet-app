import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { chooseValetAction } from "../../reducers";

import {Grid, Header, Dropdown, Select, Button, List} from 'semantic-ui-react'


class ChooseValet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosendValet: ""
    };
    this.handleChooseValet = this.handleChooseValet.bind(this);
  }

  handleChooseValet(valet) {
    console.log(valet);
    this.props.chooseValetAction(valet, () =>
      this.props.history.push("/pacSearch")
    );
  }
  render() {
    const valetList = this.props.employees.map(employee => ({
      text: employee.name,
      value: employee.id
    }));
    return (
      <div>
          <Grid>
              <Grid.Row>
           <Dropdown placeholder="Choose a Valet" fluid open scrolling selection options={valetList} onChange={(e, data) => {
               console.log(e, data)
               this.setState({chosenValet: data.value})
            }}/>
            </Grid.Row>
            <Grid.Row>
           <Button color="yellow" onClick={() => this.handleChooseValet(this.state.chosenValet)}>Go</Button>
           </Grid.Row>
           </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { chooseValetAction })(ChooseValet);
