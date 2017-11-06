import React, { Component } from "react";
import { Grid, Accordion, Icon } from "semantic-ui-react";
import { getLotStatusAction, setNavTitleAction } from "../../reducers";
import { connect } from "react-redux";
import NavBar from "../navBar/navBar";


class LotStatus extends Component {
  constructor(props) {
    super(props);
    this.props.getLotStatusAction();
    this.state = { activeIndex: 0 };
    this.props.setNavTitleAction("Dashboard", () =>
      this.props.history.push("/home")
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ lotStatus: nextProps.lotStatus });
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    console.log(index, activeIndex, newIndex);
    this.setState({ activeIndex: newIndex });
  };
  render() {
    const spaces = {};
    this.props.lotStatus.sort().forEach(space => {
      if (spaces[space.location1]) {
        spaces[space.location1].push(space);
      } else {
        spaces[space.location1] = [space];
      }
    });
    const { activeIndex } = this.state;

    let spacesJsx = [];
    for (var key in spaces) {
      let locationJsx = spaces[key]
        .sort(
          (a, b) =>
            +a.location5.replace(/[^0-9]/g, "") -
            +b.location5.replace(/[^0-9]/g, "")
        )
        .map(space => (
          <div>
            {space.location2} {space.location5} -
            <span
              style={{
                color: space.parkingstatus ? "rgb(200, 0, 0)" : "rgb(0, 150, 0)"
              }}
            >
              {space.parkingstatus ? space.parkingstatus : "Open"}
            </span>
          </div>
        ));

      spacesJsx.push(
        <div key={key}>
          <Accordion.Title
            active={activeIndex === key}
            index={key}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            {key}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === key}>
            {locationJsx}
          </Accordion.Content>
        </div>
      );
    }

    return (
      <div>
        <NavBar />
        <Grid
          centered
          className="white"
          computer={6}
          mobile={12}
          verticalAlign="middle"
        >
          <Grid.Column verticalAlign="middle" width={12}>
            <Accordion>
              {spacesJsx.sort((a, b) => {
                return (
                  +a.key.replace(/[^0-9]/g, "") - +b.key.replace(/[^0-9]/g, "")
                );
              })}
            </Accordion>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {
  getLotStatusAction,
  setNavTitleAction
})(LotStatus);
