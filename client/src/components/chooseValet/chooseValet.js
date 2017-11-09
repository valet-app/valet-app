import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "../navBar/navBar";
import { chooseValetAction, setNavTitleAction } from "../../reducers";

import { Grid, Header, Segment, Button } from "semantic-ui-react";

class ChooseValet extends Component {
  constructor(props) {
    super(props);
    this.props.setNavTitleAction("Home", () => this.props.history.goBack());
    this.state = {
      chosenValet: ""
    };
    this.handleChooseValet = this.handleChooseValet.bind(this);
  }

  handleChooseValet(valet) {
    this.props.chooseValetAction(valet);
    this.props.history.push("search");
  }
  render() {
    console.log("path", this.props.history.location.pathname);
    const verb = this.props.history.location.pathname;
    const valet = this.state.chosenValet;
    console.log(this.props.employees);
    console.log(valetList)
    const valetList = this.props.employees
      .filter(employee => employee.isactive === true && employee.company_id === this.props.login.company_id)
      .map(employee => (
        <Segment
          onClick={(e, data) =>
            this.setState({
              chosenValet: employee.id,
              valetName: employee.name
            })}
        >
          {employee.name}
        </Segment>
      ));
      
  
    return (
      <div>
        <NavBar />
        <br />
        <Grid padded="vertically" centered>
          <Grid.Row>
            <Header as="h3" color="grey">
              Who is{" "}
              {verb === "/park/chooseValet" ? (
                <span>Parking</span>
              ) : (
                <span>Retrieving</span>
              )}{" "}
              this Car?
            </Header>
          </Grid.Row>
          <Grid.Column width={12}>
            <Segment.Group>{valetList}</Segment.Group>
          </Grid.Column>
          <Grid.Row>
            {valet ? (
              <Header as="h2" color="grey">
                {this.state.valetName}
              </Header>
            ) : null}
          </Grid.Row>

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
export default connect(mapStateToProps, {
  chooseValetAction,
  setNavTitleAction
})(ChooseValet);
