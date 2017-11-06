import React, { Component, Dropdown } from "react";
import { Tab, Divider, Grid } from "semantic-ui-react";
import { getLotStatusAction } from "../../reducers";
import { connect } from "react-redux";
import _ from "lodash";

// const panes = [
//     { menuItem: '{}', render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane> },
//     { menuItem: 'Tab 2', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
//     { menuItem: 'Tab 3', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
//   ]

class LotStatus extends Component {
  constructor(props) {
    super(props);
    this.props.getLotStatusAction();
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ lotStatus: nextProps.lotStatus });
  }

  render() {
    console.log(this.state.lotStatus);
    const lots = this.props.lotStatus.map(lot => lot.location1);
    const tabNames = _.uniq(lots);

    console.log(tabNames);
    return (
      <Grid centered className="white"
      computer={6}
      mobile={12}
      verticalAlign="middle">
          <Grid.Column verticalAlign="middle" width={12}>
        {tabNames[2]}
        </Grid.Column>
        <Grid.Column verticalAlign="middle" width={12} 
        >
        {tabNames[3]}
        </Grid.Column>
        <Grid.Column verticalAlign="middle" width={12}>
        {tabNames[0]}
        </Grid.Column>
        <Grid.Column verticalAlign="middle" width={12}>
        {tabNames[1]}
        </Grid.Column>
      </Grid>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, { getLotStatusAction })(LotStatus);
