import React from "react";
import { Icon } from "semantic-ui-react";
import axios from "axios";

class CarInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      car: this.props.vehicle.car_id,
      color: this.props.vehicle.color,
      trueColor: true,
      notes: [],
      hidden: true
    };
    this.validTextColour = this.validTextColour.bind(this);
  }
  componentDidMount() {
    const valid = this.validTextColour(this.props.vehicle.color);
    console.log(valid);
    if (!valid) {
      this.setState({ trueColor: false });
    }
    axios.get(`/api/carnotes?id=${this.props.vehicle.car_id}`).then(result => {
      this.setState({ notes: result.data});
    });
  }
  componentDidUpdate() {
    if (this.state.color !== this.props.vehicle.color) {
      const valid = this.validTextColour(this.props.vehicle.color);
      if (!valid) {
        this.setState({ trueColor: false, color: this.props.vehicle.color });
      }
    }
    if (this.props.notes && this.state.notes.length != this.props.notes.length && this.props.notes.length != 0){
      this.setState({notes: this.props.notes})
    }
    if (this.props.vehicle.car_id && this.props.vehicle.car_id != this.state.car){
      axios.get(`/api/carnotes?id=${this.props.vehicle.car_id}`).then(result => {
        this.setState({ notes: result.data, car: this.props.vehicle.car_id});
      }
      )}
}
  validTextColour(stringToTest) {
    if (stringToTest === "") {
      return false;
    }
    if (stringToTest === "inherit") {
      return false;
    }
    if (stringToTest === "transparent") {
      return false;
    }

    var image = document.createElement("img");
    image.style.color = "rgb(0, 0, 0)";
    image.style.color = stringToTest;
    if (image.style.color !== "rgb(0, 0, 0)") {
      return true;
    }
    image.style.color = "rgb(255, 255, 255)";
    image.style.color = stringToTest;
    return image.style.color !== "rgb(255, 255, 255)";
  }
  render() {
    return (
      <div className="carInfo">
        <div>
          <h1>
            {this.props.vehicle.make} {this.props.vehicle.model}{" "}
            {this.state.notes.length >= 1 && (
              <span>
                <Icon
                  name="sticky note outline"
                  size="tiny"
                  color="grey"
                  onClick={e => this.setState({ hidden: !this.state.hidden })}
                />
              </span>
            )}
          </h1>
        </div>
        <div className="flexColumn">
          {this.state.trueColor && (
            <div
              className="colorBox"
              style={{ backgroundColor: this.props.vehicle.color }}
            />
          )}
          {!this.state.trueColor && <p>{this.props.vehicle.color}</p>}
          <div>
            <div className="license">
              <small className="noMargin">license plate</small>
              <h4 className="noMargin">{this.props.vehicle.licenseplate}</h4>
            </div>
          </div>
        </div>
        {!this.state.hidden && (
          <div className="notes">
            <ul>{this.state.notes.map(car => (<li>{car.notes}</li>))}</ul>
          </div>
        )}
      </div>
    );
  }
}

export default CarInfo;
