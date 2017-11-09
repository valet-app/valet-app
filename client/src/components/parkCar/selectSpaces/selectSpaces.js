import React, { Component } from "react";
import { Dropdown, Step, Header } from "semantic-ui-react";
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
    console.log(this.props.chosenVehicle);
  }

  render() {
    const {
      selectedLocation1,
      selectedLocation2,
      selectedLocation3,
      selectedLocation4,
      selectedLocation5
    } = this.state;
    const { openSpaces, chosenVehicle } = this.props;
    let location1, location2, location3, location4, location5;
    if (openSpaces.length) {
      let priority;
      if (chosenVehicle.ranking === 1) {
        priority = 0;
      } else if (chosenVehicle.ranking === 2) {
        priority = Math.floor(openSpaces.length / 2);
      } else {
        priority = openSpaces.length - 1;
      }

      if (chosenVehicle.parkingspace_id && this.state.changed) {
        openSpaces.push({
          location1: chosenVehicle.location1,
          location2: chosenVehicle.location2,
          location3: chosenVehicle.location3,
          location4: chosenVehicle.location4,
          location5: chosenVehicle.location5,
          id: chosenVehicle.parkingspace_id
        });
      }

      const suggested = _.sortBy(openSpaces, "priority")[priority];

      location1 = _.sortBy(
        _.uniqBy(openSpaces, "location1"),
        "location1"
      ).map((space, index) => {
        return Object.assign({}, space, {
          text: space.location1,
          value: index,
          id: space.id
        });
      });

      location2 = _.sortBy(
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

      location3 = _.sortBy(
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

      location4 = _.sortBy(
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

      location5 = _.sortBy(
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

      if (!chosenVehicle.parkingspace_id && !this.state.changed) {
        location1.unshift({
          text: suggested.location1,
          value: 0,
          id: suggested.id
        });
        location2.unshift({
          text: suggested.location2,
          value: 0,
          id: suggested.id
        });
        location3.unshift({
          text: suggested.location3,
          value: 0,
          id: suggested.id
        });
        location4.unshift({
          text: suggested.location4,
          value: 0,
          id: suggested.id
        });
        location5.unshift({
          text: suggested.location5,
          value: 0,
          id: suggested.id
        });
      }

      if (chosenVehicle.parkingspace_id && !this.state.changed) {
        location1.unshift(
          Object.assign({}, this.props.chosenVehicle, {
            text: this.props.chosenVehicle.location1,
            value: 0,
            id: this.props.chosenVehicle.parkingspace_id
          })
        );
        location2.unshift(
          Object.assign({}, this.props.chosenVehicle, {
            text: this.props.chosenVehicle.location2,
            value: 0,
            id: this.props.chosenVehicle.parkingspace_id
          })
        );
        location3.unshift(
          Object.assign({}, this.props.chosenVehicle, {
            text: this.props.chosenVehicle.location3,
            value: 0,
            id: this.props.chosenVehicle.parkingspace_id
          })
        );
        location4.unshift(
          Object.assign({}, this.props.chosenVehicle, {
            text: this.props.chosenVehicle.location4,
            value: 0,
            id: this.props.chosenVehicle.parkingspace_id
          })
        );
        location5.unshift(
          Object.assign({}, this.props.chosenVehicle, {
            text: this.props.chosenVehicle.location5,
            value: 0,
            id: this.props.chosenVehicle.parkingspace_id
          })
        );
      }
      console.log(suggested);
      console.log("selected5:", selectedLocation5);
      console.log("location5 array", location5);
      console.log("selected space", location5[selectedLocation5]);
      this.props.chooseSpaceAction(location5[selectedLocation5].id || null);
    }
    return (
      <div>
        {location5 ? (
          <div>
            <Header color="yellow" as="h2">
              {location1[selectedLocation1].text} -{" "}
              {location5[selectedLocation5].text}
            </Header>
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
                  selectedLocation5: 0,
                  changed: true
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
                  selectedLocation5: 0,
                  changed: true
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
                  selectedLocation5: 0,
                  changed: true
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
                  selectedLocation5: 0,
                  changed: true
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
                  selectedLocation5: data.value,
                  changed: true
                });
                this.props.chooseSpaceAction(location5[selectedLocation5]);
              }}
              options={location5}
              value={selectedLocation5}
            />
          </div>
        ) : (
          <div>No spaces are available for this vehicle type.</div>
        )}
      </div>
    );
  }
}

export default connect(null, { chooseSpaceAction })(SelectSpaces);
