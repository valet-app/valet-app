import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import logo from "../../valet-logo.png";
import { Doughnut, Bar, HorizontalBar } from "react-chartjs-2";
import { getLotStatusAction } from "../../reducers";

import { Header, Grid, Image, Input } from "semantic-ui-react";

const lotStatusDoughnut = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: []
    }
  ]
};

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.props.getLotStatusAction();
    this.state = {
      options: {
        legend: {
          display: true
        }
      },

      horizBarOptions: {
        title: {
          display: false,
          text: "Chart.js Bar Chart - Stacked"
        },
        tooltips: {
          mode: "index",
          intersect: false
        },
        responsive: true,
        scales: {
          xAxes: [
            {
              stacked: true
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      },

      numCarsParkedByEmployeeData: {
        labels: [],
        datasets: [
          {
            label: "Cars Parked",
            backgroundColor: "rgba(255,99,132,1)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,1)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: []
          },
          {
            label: "Cars Retrieved",
            backgroundColor: "#36A2EB",
            borderColor: "#36A2EB",
            borderWidth: 1,
            hoverBackgroundColor: "#36A2EB",
            hoverBorderColor: "#36A2EB",
            data: []
          }
        ]
      },

      numCarsParkedByHourData: {
        labels: [
          "01 AM",
          "02 AM",
          "03 AM",
          "04 AM",
          "05 AM",
          "06 AM",
          "07 AM",
          "08 AM",
          "09 AM",
          "10 AM",
          "11 AM",
          "12 PM",
          "01 PM",
          "02 PM",
          "03 PM",
          "04 PM",
          "05 PM",
          "06 PM",
          "07 PM",
          "08 PM",
          "09 PM",
          "10 PM",
          "11 PM",
          "12 AM"
        ],
        datasets: [
          {
            label: "Parked",
            backgroundColor: "rgba(255,99,132,1)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]
          },
          {
            label: "Retrieved",
            backgroundColor: "#36A2EB",
            borderColor: "#36A2EB",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]
          }
        ]
      }
    };
    this.handleGetData = this.handleGetData.bind(this);
  }

  handleGetData(chartDate) {
    //reset every hour slot to zero before adding new data
    let changes = this.state.numCarsParkedByHourData;
    for (let i = 0; i < changes.datasets[0].data.length; i++) {
      // [0] is cars parked, [1] is cars retrieved
      changes.datasets[0].data[i] = 0;
      changes.datasets[1].data[i] = 0;
    }
    axios
      .get(
        `/api/chartHourlyParks/?chartdate=` +
          chartDate +
          `&company_id=` +
          this.props.login.company_id
      )
      .then(result => {
        for (let i = 0; i < result.data.length; i++) {
          // determine where in chart array the value goes
          var x = this.state.numCarsParkedByHourData.labels.indexOf(
            result.data[i].hourofday
          );
          // and then put the numbers of cars in that spot
          changes.datasets[0].data[x] = result.data[i].numparked;
        }
      })
      .then(
        // get cars retrieved per hour
        axios
          .get(
            `/api/chartHourlyRetrievals/?chartdate=` +
              chartDate +
              `&company_id=` +
              this.props.login.company_id
          )
          .then(result => {
            for (let i = 0; i < result.data.length; i++) {
              // determine where in chart array the value goes
              var x = this.state.numCarsParkedByHourData.labels.indexOf(
                result.data[i].hourofday
              );
              // and then put the numbers of cars in that spot
              changes.datasets[1].data[x] = result.data[i].numparked;
            }
            // after the changes have all been made, set State
            this.setState({ numCarsParkedByHour: changes });
          })
      );

    axios
      .get(
        `/api/chartHourlyEmplWork/?chartdate=` +
          chartDate +
          `&company_id=` +
          this.props.login.company_id
      )
      .then(result => {
        console.log(result.data);
        let barData = this.state.numCarsParkedByEmployeeData;

        // Fill in the labels with unique names in the returned dataset:
        barData.labels = [...new Set(result.data.map(item => item.name))];
        console.log("Labels");
        console.log(barData.labels);
        console.log("Cars Parked");
        console.log(barData.datasets[0].data);
        console.log("Cars Retreived");
        console.log(barData.datasets[1].data);

        for (let i = 0; i < result.data.length; i++) {
          // determine where in chart array the value goes
          var x = barData.labels.indexOf(result.data[i].name);
          console.log(result.data[i].name, " is in position ", x);
          result.data[i].status_id === 2
            ? (barData.datasets[0].data[x] = result.data[i].numparked)
            : (barData.datasets[1].data[x] = result.data[i].numparked);

          //and then put the numbers of cars in that spot
          //   changes.datasets[0].data[x] = result.data[i].numparked;
        }

        this.setState({ numCarsParkedByEmployeeData: barData });
      });
  }

  render() {
    lotStatusDoughnut.labels = [
      ...new Set(this.props.lotStatus.map(item => item.parkingstatus))
    ];

    for (var i = 0; i < lotStatusDoughnut.labels.length; i++) {
      lotStatusDoughnut.datasets[0].data[i] = 0;

      switch (lotStatusDoughnut.labels[i]) {
        case "Parked":
          lotStatusDoughnut.datasets[0].backgroundColor[i] = "#df0a16";
          break;
        case "Open":
          lotStatusDoughnut.datasets[0].backgroundColor[i] = "#00E600";
          break;
        default:
          lotStatusDoughnut.datasets[0].backgroundColor[i] = "#FFCE56";
          break;
      }

      for (var j = 0; j < this.props.lotStatus.length; j++) {
        if (
          lotStatusDoughnut.labels[i] === this.props.lotStatus[j].parkingstatus
        ) {
          lotStatusDoughnut.datasets[0].data[i]++;
        }
      }
    }

    return (
      <div className="ui grid centered">
        <Grid centered padding="vertically" verticalAlign="middle">
          <Grid.Row centered>
            <Image src={logo} style={{ width: "75px", height: "75px" }} />
            <Header size="huge" color="grey">
              Company Analytics
            </Header>
          </Grid.Row>

          <Grid.Row columns={2} stretched centered>
            <h2>Parking Space Status</h2>
            <Doughnut data={lotStatusDoughnut} />
          </Grid.Row>

          <h2>Number of Cars Parked per Hour</h2>
          <Input
            placeholder="Date"
            type="date"
            onChange={e => this.handleGetData(e.target.value)}
          />

          <Grid.Column width={16} verticalAlign="middle" stretched>
            <div>
              <Bar
                data={this.state.numCarsParkedByHourData}
                width={100}
                height={50}
                options={this.state.options}
                redraw
              />
            </div>
            <div>
              <h2>Cars Per Employee</h2>
              <HorizontalBar
                data={this.state.numCarsParkedByEmployeeData}
                options={this.state.horizBarOptions}
              />
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, {
  getLotStatusAction
})(Analytics);
