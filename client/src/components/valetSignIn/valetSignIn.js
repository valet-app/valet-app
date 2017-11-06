import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "../navBar/navBar";
import { chooseValetAction, setNavTitleAction } from "../../reducers";
import {
  Grid,
  Header,
  Segment,
  Button,
  Input,
  Dropdown,
  Radio
} from "semantic-ui-react";
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
  renderValet(valet) {
    return (
      <Grid.Row>
        <Grid.Row>
          <h2 className="valetList">
            <div>{valet.name}</div>
            <Radio
              toggle
              defaultChecked={valet.isactive}
              onChange={(e, data) => this.toggle(valet, data)}
            />
          </h2>
        </Grid.Row>
      </Grid.Row>
    );
  }

  render() {
    const valets = this.props.employees.filter(employee =>
      RegExp(this.state.searchValue, "i").test(employee.name)
    );
    return (
      <div>
        <NavBar />
        <Grid padded="vertically" centered>
          <Header as="h1" className="grey">
            {" "}
            Valet Sign-In{" "}
          </Header>
          <Grid.Row>
            <Input
              value={this.state.searchValue}
              onChange={e => this.setState({ searchValue: e.target.value })}
              placeholder="Search "
            />
          </Grid.Row>

          <Grid.Column width={12}>
            {valets.map(valet => this.renderValet(valet))}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { setNavTitleAction })(ValetSignIn);
