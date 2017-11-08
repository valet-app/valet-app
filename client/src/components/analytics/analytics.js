import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import logo from "../../valet-logo.png";
import { Doughnut, Line, Scatter, Bar } from "react-chartjs-2";
import { getLotStatusAction } from "../../reducers";

import { Header, Button, Grid, Image, Input } from "semantic-ui-react";

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
      carsParkedDate: "2017-11-07",
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
            label: " ",
            backgroundColor: "rgba(255,99,132,0.2)",
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
          }
        ]
      }
    };
    this.handleGetData = this.handleGetData.bind(this);
  }

  handleGetData() {
    console.log(this.state.carsParkedDate);
    axios
      .get(`/api/chartHourlyParks/?chartdate=` + this.state.carsParkedDate)
      .then(result => {
        console.log(result.data);
        console.log(this.state.numCarsParkedByHourData);

        let changes = this.state.numCarsParkedByHourData;

        console.log(this.state.numCarsParkedByHourData.datasets[0].data);

        for (let i = 0; i < result.data.length; i++) {
          console.log(result.data[i].hourofday);
          console.log(result.data[i].numparked);

          // determine where in array the value goes
          var x = this.state.numCarsParkedByHourData.labels.indexOf(
            result.data[i].hourofday
          );

          changes.datasets[0].data[x] = 10;
          console.log(x);
        }
        this.setState({ numCarsParkedByHour: changes });
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
        case "Incoming":
          lotStatusDoughnut.datasets[0].backgroundColor[i] = "#FFCE56";
          break;
        case "Outgoing":
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

          <Input
            placeholder="Date"
            iconPosition="left"
            icon="calendar"
            onChange={e => this.setState({ carsParkedDate: e.target.value })}
          />
          <Button
            type="submit"
            onClick={this.handleGetData}
            //fluid
            className="yellow"
          >
            Get Data{" "}
          </Button>

          <Grid.Column width={16} verticalAlign="middle" stretched>
            <div>
              <h2>Number of Cars Parked per Hour</h2>
              <Bar
                data={this.state.numCarsParkedByHourData}
                width={100}
                height={50}
                options={{ maintainAspectRatio: true }}
                redraw
              />
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// const mapStateToProps = state => state;
// export default connect(mapStateToProps, {})(Analytics);

const mapStateToProps = state => state;
export default connect(mapStateToProps, {
  getLotStatusAction
})(Analytics);
