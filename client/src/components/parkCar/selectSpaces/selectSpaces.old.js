import React, { Component } from "react";
import { Dropdown, Step } from "semantic-ui-react";

class SelectSpaces extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.setState(this.buildDropdowns());
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.buildDropdowns(nextProps));
  }

  buildDropdowns(nextProps) {
    const { openSpaces } = nextProps || this.props;

    let location1 = [{ value: "" }];
    let location2 = [{ value: "" }];
    let location3 = [{ value: "" }];
    let location4 = [{ value: "" }];
    let location5 = [{ value: "" }];

    let selectedLocation1;
    let selectedLocation2;
    let selectedLocation3;
    let selectedLocation4;
    let selectedLocation5;

    if (openSpaces) {
      location1 = Object.keys(openSpaces)
        .sort()
        .map(key => {
          return { text: key, value: key };
        });
      console.log(location1);
      location2 = Object.keys(
        openSpaces[this.state.selectedLocation1 || location1[0].value]
      )
        .sort()
        .map(key => {
          return { text: key, value: key };
        });
      console.log(location2);
      location3 = Object.keys(
        openSpaces[this.state.selectedLocation1 || location1[0].value][
          this.state.selectedLocation2 || location2[0].value
        ]
      )
        .sort()
        .map(key => {
          return { text: key, value: key };
        });
      location4 = Object.keys(
        openSpaces[this.state.selectedLocation1 || location1[0].value][
          this.state.selectedLocation2 || location2[0].value
        ][this.state.selectedLocation3 || location3[0].value]
      )
        .sort()
        .map(key => {
          return { text: key, value: key };
        });

      location5 = openSpaces[
        this.state.selectedLocation1 || location1[0].value
      ][this.state.selectedLocation2 || location2[0].value][
        this.state.selectedLocation3 || location3[0].value
      ][this.state.selectedLocation4 || location4[0].value]
        .sort()
        .map(space => {
          return { text: space.text, value: space.id };
        });

      selectedLocation1 = location1[0].value;
      selectedLocation2 = location2[0].value;
      selectedLocation3 = location3[0].value;
      selectedLocation4 = location4[0].value;
      selectedLocation5 = location5[0].value;

      console.log(selectedLocation1);
    }

    return {
      location1,
      location2,
      location3,
      location4,
      location5,
      selectedLocation1,
      selectedLocation2,
      selectedLocation3,
      selectedLocation4,
      selectedLocation5
    };
  }
  render() {
    const {
      location1,
      location2,
      location3,
      location4,
      location5
    } = this.buildDropdowns();
    console.log(this.buildDropdowns());
    console.log(this.state);
    return (
      <div>
        <Dropdown
          onChange={(e, data) => {
            this.setState({
              selectedLocation1: data.value,
              selectedLocation2: null,
              selectedLocation3: null,
              selectedLocation4: null,
              selectedLocation5: null
            });
          }}
          options={location1}
          value={this.state.selectedLocation1}
          style={{ paddingRight: "5px" }}
        />
        <Dropdown
          onChange={(e, data) => {
            this.setState({
              selectedLocation2: data.value,
              selectedLocation3: null,
              selectedLocation4: null,
              selectedLocation5: null
            });
          }}
          options={location2}
          value={this.state.selectedLocation2}
          style={{ paddingRight: "5px" }}
        />
        <Dropdown
          onChange={(e, data) => {
            this.setState({
              selectedLocation3: data.value,
              selectedLocation4: null,
              selectedLocation5: null
            });
          }}
          options={location3}
          value={this.state.selectedLocation3}
          style={{ paddingRight: "5px" }}
        />
        <Dropdown
          onChange={(e, data) => {
            this.setState({
              selectedLocation4: data.value,
              selectedLocation5: null
            });
          }}
          options={location4}
          value={this.state.selectedLocation4}
          style={{ paddingRight: "5px" }}
        />
        <Dropdown
          onChange={(e, data) => {
            this.setState({
              selectedLocation5: data.value
            });
            this.props.handleChange(this.state.selectedLocation5);
          }}
          options={location5}
          value={this.state.selectedLocation5}
          style={{ paddingRight: "5px" }}
        />
      </div>
    );
  }
}

export default SelectSpaces;
