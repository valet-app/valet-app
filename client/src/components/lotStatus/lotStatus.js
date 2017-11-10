import React, { Component } from "react";
import { Grid, Segment, Table, Menu, Dropdown, Icon } from "semantic-ui-react";
import { getLotStatusAction, setNavTitleAction } from "../../reducers";
import { connect } from "react-redux";
import NavBar from "../navBar/navBar";
import _ from "lodash";

class LotStatus extends Component {
  constructor(props) {
    super(props);
    this.props.getLotStatusAction();
    this.state = { selected: "", lotStatus: [] };
    this.props.setNavTitleAction("Dashboard", () =>
      this.props.history.push("/home")
    );
  }

  componentWillReceiveProps({ lotStatus }) {
    let selected;
    if (lotStatus.length) {
      selected = _.sortBy(lotStatus, "location1")[0].location1;
      this.setState({
        lotStatus,
        selected
      });
    }
  }

  render() {
    const spaces = {};
    const { lotStatus } = this.state;
    console.log(lotStatus);
    const open = lotStatus.filter(space => space.parkingstatus === "Open")
      .length;
    const options = _.sortBy(
      _.uniqBy(lotStatus, "location1"),
      "location1"
    ).map(({ location1 }) => {
      return { text: location1, value: location1 };
    });

    const colors = {
      Open: "red",
      Incoming: "blue",
      Parked: "green",
      Outgoing: "orange"
    };
    return (
      <div>
        <NavBar />
        <Grid centered>
          <Grid.Row>
            <h1>Lot Status</h1>
          </Grid.Row>
          <p>
            {open}/{lotStatus.length} Spaces Available
          </p>
          <br />
        </Grid>
        <Grid centered>
          <Grid.Row>
            <Dropdown
              selection
              options={options}
              value={this.state.selected}
              onChange={(e, data) => {
                this.setState({
                  selected: data.value
                });
              }}
            />
          </Grid.Row>
        </Grid>

        {_.sortBy(_.filter(lotStatus, { location1: this.state.selected }), [
          "location2",
          "location3",
          "location4",
          "location5"
        ]).map(space => (
          <div className="lot-status-row">
            <div>
              {space.location2} {space.location3} {space.location5}
            </div>
            <div>
              {space.parkingstatus}{" "}
              <Icon
                name="circle"
                className="blur"
                color={colors[space.parkingstatus]}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {
  getLotStatusAction,
  setNavTitleAction
})(LotStatus);
