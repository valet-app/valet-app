import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import logo from "../../valet-logo.png";
import { Doughnut, Line, Scatter, Bar } from "react-chartjs-2";

import {
  Header,
  Grid,
  Image,
  Divider
} from "semantic-ui-react";

const dataDoughnut = {
  labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ]
};

const dataLine = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const dataScatter = {
  labels: ["Scatter"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      backgroundColor: "rgba(75,192,192,0.4)",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [
        { x: 65, y: 75 },
        { x: 59, y: 49 },
        { x: 80, y: 90 },
        { x: 81, y: 29 },
        { x: 56, y: 36 },
        { x: 55, y: 25 },
        { x: 40, y: 18 }
      ]
    }
  ]
};

const dataBar = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCompanyName: "",
      company_id: "",
      username: "",
      name: "",
      admin: true,
      password: "",
      confirmpassword: "",
      matchpass: true,
      error: "",
      accept: false
    };
    this.handleSignup = this.handleGetData.bind(this);
  }

  handleGetData() {
    !this.state.error ? console.log("yes") : console.log("no");

    this.state.password !== this.state.confirmpassword
      ? this.setState({ matchpass: false })
      : axios
          .post(`/api/company`, { name: this.state.newCompanyName })
          .then(result => {
            this.setState({ company_id: result.data[0].id });
            //After company has been added, add the employee
            const { company_id, username, name, admin, password } = this.state;
            axios
              .post(`/api/empl`, {
                company_id,
                username,
                name,
                admin,
                password
              })
              .then(result => {
                this.props.history.push("/login");
              });
          });
  }

  handleCheck(e) {
    console.log(e.target.checked);
  }

  render() {
    return (
      <div className="ui grid centered">
        <br />
        <Grid centered padding="vertically" verticalAlign="middle">
          <Grid.Row centered>
            <Image src={logo} style={{ width: "75px", height: "75px" }} />
            <Header size="huge" color="grey">
              Company Analytics
            </Header>
          </Grid.Row>

          <Grid.Column width={12} verticalAlign="middle" stretched />
          <Grid.Row columns={2} stretched centered>
            <div>
              <h2>Doughnut Example</h2>
              <Doughnut data={dataDoughnut} />
              <Divider horizontal />
            </div>
          </Grid.Row>
          <Grid.Row columns={2} stretched centered>
            <div>
              <h2>Line Example</h2>
              <Line data={dataLine} />
            </div>

            <div>
              <h2>Scatter Example</h2>
              <Scatter data={dataScatter} />
            </div>

            <div>
              <h2>Bar Example (custom size)</h2>
              <Bar
                data={dataBar}
                width={100}
                height={50}
                options={{
                  maintainAspectRatio: true
                }}
              />
            </div>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {})(Analytics);
