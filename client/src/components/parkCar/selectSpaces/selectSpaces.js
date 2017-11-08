import React, { Component } from "react";
import { Dropdown, Step } from "semantic-ui-react";
import _ from "lodash";
import { connect } from "react-redux";
import { chooseSpaceAction } from "../../../reducers";

class SelectSpaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation1: 0,
      selectedLocation2: 0,
      selectedLocation3: 0,
      selectedLocation4: 0,
      selectedLocation5: 0
    };
  }

  render() {
    const {
      selectedLocation1,
      selectedLocation2,
      selectedLocation3,
      selectedLocation4,
      selectedLocation5
    } = this.state;
    const { openSpaces } = this.props;
    if (openSpaces.length) {
      let location1 = _.sortBy(
        _.uniqBy(openSpaces, "location1"),
        "location1"
      ).map((space, index) => {
        return Object.assign({}, space, {
          text: space.location1,
          value: index
        });
      });
      let location2 = _.sortBy(
        _.uniqBy(
          openSpaces.filter(
            (space, index) =>
              space.location1 === location1[selectedLocation1].location1
          ),
          "location2"
        ),
        "location2"
      ).map((space, index) => {
        return Object.assign({}, space, {
          text: space.location2,
          value: index,
          id: space.id
        });
      });

      let location3 = _.sortBy(
        _.uniqBy(
          openSpaces.filter(
            (space, index) =>
              space.location1 === location1[selectedLocation1].location1 &&
              space.location2 === location2[selectedLocation2].location2
          ),
          "location3"
        ),
        "location3"
      ).map((space, index) => {
        return Object.assign({}, space, {
          text: space.location3,
          value: index,
          id: space.id
        });
      });

      let location4 = _.sortBy(
        _.uniqBy(
          openSpaces.filter(
            (space, index) =>
              space.location1 === location1[selectedLocation1].location1 &&
              space.location2 === location2[selectedLocation2].location2 &&
              space.location3 === location3[selectedLocation3].location3
          ),
          "location4"
        ),
        "location4"
      ).map((space, index) => {
        return Object.assign({}, space, {
          text: space.location4,
          value: index,
          id: space.id
        });
      });

      let location5 = _.sortBy(
        _.uniqBy(
          openSpaces.filter(
            (space, index) =>
              space.location1 === location1[selectedLocation1].location1 &&
              space.location2 === location2[selectedLocation2].location2 &&
              space.location3 === location3[selectedLocation3].location3 &&
              space.location4 === location4[selectedLocation4].location4
          ),
          "location5"
        ),
        "location5"
      ).map((space, index) => {
        return Object.assign({}, space, {
          text: space.location5,
          value: index,
          id: space.id
        });
      });
      this.props.chooseSpaceAction(location5[selectedLocation5].id);
    }
    return (
      <div>
        <Dropdown
          options={location1}
          value={selectedLocation1}
          inline
          onChange={(e, data) => {
            this.setState({
              selectedLocation1: data.value,
              selectedLocation2: 0,
              selectedLocation3: 0,
              selectedLocation4: 0,
              selectedLocation5: 0
            });
            this.props.chooseSpaceAction(location5[selectedLocation5]);
          }}
        />

        <Dropdown
          value={selectedLocation2}
          inline
          onChange={(e, data) => {
            console.log("change");
            this.setState({
              selectedLocation2: data.value,
              selectedLocation3: 0,
              selectedLocation4: 0,
              selectedLocation5: 0
            });
            this.props.chooseSpaceAction(location5[selectedLocation5]);
          }}
          options={location2}
        />
        <Dropdown
          inline
          onChange={(e, data) => {
            this.setState({
              selectedLocation3: data.value,
              selectedLocation4: 0,
              selectedLocation5: 0
            });
            this.props.chooseSpaceAction(location5[selectedLocation5]);
          }}
          options={location3}
          value={selectedLocation3}
        />
        <Dropdown
          inline
          onChange={(e, data) => {
            this.setState({
              selectedLocation4: data.value,
              selectedLocation5: 0
            });
          }}
          options={location4}
          value={selectedLocation4}
        />
        <Dropdown
          inline
          onChange={(e, data) => {
            console.log("5 changed");
            this.setState({
              selectedLocation5: data.value
            });
            this.props.chooseSpaceAction(location5[selectedLocation5]);
          }}
          options={location5}
          value={selectedLocation5}
        />
      </div>
    );
  }
}

export default connect(null, { chooseSpaceAction })(SelectSpaces);
