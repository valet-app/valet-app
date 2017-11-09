import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "../navBar/navBar";
import { setNavTitleAction } from "../../reducers";
import { Grid, Header, Radio, Input } from "semantic-ui-react";
import axios from "axios";

class ValetSignIn extends Component {
  constructor(props) {
    super(props);
    this.props.setNavTitleAction("Dashboard", () =>
      this.props.history.push("/home")
    );
    console.log(this.props.employees);
    this.state = {
      searchValue: ""
    };
    this.handleValetClick = this.handleValetClick.bind(this);
  }

  handleValetClick(valet) {
    this.props.chooseValetAction(valet);
  }

  toggle(valet, data) {
    console.log(valet);
    axios
      .put(`/api/empl?id=${valet.id}`, { isactive: data.checked })
      .then(response => console.log(response));
  }

  render() {
    const companyValets = this.props.employees.filter(
      employee => employee.company_id === this.props.login.company_id
    );
    const valets = companyValets.filter(employee =>
      RegExp(this.state.searchValue, "i").test(employee.name)
    );
    const active = companyValets.filter(employee => employee.isactive === true);
    const nonactive = companyValets.filter(
      employee => employee.isactive === false
    );

    console.log(active);
    const buildList = valet => (
      <div>
        <Grid.Row>
          <Grid.Row>
            <h3 className="valetList">
              <div>{valet.name}</div>
              <Radio
                toggle
                defaultChecked={valet.isactive}
                onChange={(e, data) => this.toggle(valet, data)}
              />
            </h3>
          </Grid.Row>
        </Grid.Row>
      </div>
    );

    return (
      <div>
        <NavBar />
        <br />

        <Grid padded="vertically" centered>
          <Header as="h1" className="grey">
            Valet Sign-In
          </Header>
          <Grid.Row>
            <Input
              icon="search"
              iconPosition="left"
              value={this.state.searchValue}
              onChange={e => this.setState({ searchValue: e.target.value })}
              placeholder="Search "
            />
          </Grid.Row>

          <Grid.Column width={12}>
            <Grid.Row>
              <Header as='h1'  className='grey'> Active Valets </Header>
              {active.map(buildList)}
            </Grid.Row>
          </Grid.Column>

          <Grid.Column width={12}>
            <Grid.Row>
              <Header as='h1' className='grey'> Inactive Valets </Header>
              {nonactive.map(buildList)}
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { setNavTitleAction })(ValetSignIn);
