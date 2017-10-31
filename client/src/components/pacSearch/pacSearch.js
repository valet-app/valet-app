import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Search, Grid, Button, Label, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";

import _ from "lodash";
// import { getVehiclesAction, getEmployeesAction } from "../../reducers";

class PacSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    // this.resultRenderer.propTypes = {
    //   make: PropTypes.string,
    //   description: PropTypes.string
    // };
    // this.resultRenderer = ({ make }) => {
    //   return <Label content={make} />;
    // };
  }

  //   resultRenderer({ title }) {
  //     return <Label content={result.make} />;
  //   }

  //   resultRenderer.propTypes = {
  //     title: PropTypes.string,
  //     description: PropTypes.string,
  //   }

  handleSearchChange = (e, { value }) => {
    // if (this.state.value.length < 1) return this.resetComponent();
    this.setState({ isLoading: true, value });
    const re = new RegExp(_.escapeRegExp(this.state.value), "i");
    const isMatch = result => {
      console.log(result);
      console.log(re.test(result.make));
      return re.test(result.make) || re.test(result.licenseplate);
    };
    console.log(this.props.vehicles, this.state.value);
    this.setState({
      isLoading: false,
      results: _.filter(this.props.vehicles, isMatch)
    });
  };

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <div>
        <Grid centered>
          <Grid.Row>
            <Search
              placeholder="Car, Tag, or Phone #"
              onSearchChange={this.handleSearchChange}
              results={results}
              loading={isLoading}
              resultRenderer={({ make, licenseplate }) => {
                return (
                  <div>
                    <span>{make}</span>
                    <span>{licenseplate}</span>
                  </div>
                );
              }}
            />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(PacSearch);
