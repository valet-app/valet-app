import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { chooseValetAction } from "../../reducers";

import { Grid, Header, Segment, Select, Button } from "semantic-ui-react";

class ChooseValet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenValet: ""
    };
    this.handleChooseValet = this.handleChooseValet.bind(this);
  }

  handleChooseValet(valet) {
    console.log(valet);
    this.props.chooseValetAction(valet);
    this.props.history.push("/pacSearch");
  }
  render() {
    const valetList = this.props.employees.map(employee => (
      <Segment
        onClick={(e, data) => this.setState({ chosenValet: employee.id })}
      >
        {employee.name}
      </Segment>
    ));
    return (
      <div>
        <Grid padded="vertically" centered>
          <Grid.Row>
            <Header as="h3">Who is Parking this Car?</Header>
          </Grid.Row>
          <Grid.Column width={12}>
            <Segment.Group>{valetList}</Segment.Group>
          </Grid.Column>
          <Grid.Row>
            <Button
              color="yellow"
              onClick={() => this.handleChooseValet(this.state.chosenValet)}
            >
              Go
            </Button>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { chooseValetAction })(ChooseValet);
