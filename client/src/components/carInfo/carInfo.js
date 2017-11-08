import React from 'react';

class CarInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.vehicle.color,
      trueColor: true
    }
    this.validTextColour = this.validTextColour.bind(this);
  }
  componentDidMount() {
    const valid = this.validTextColour(this.props.vehicle.color);
    console.log(valid);
    if (!valid) {
      this.setState({ trueColor: false });
    }
  }
  componentDidUpdate() {
    if (this.state.color !== this.props.vehicle.color) {
      const valid = this.validTextColour(this.props.vehicle.color);
      if (!valid) {
        this.setState({ trueColor: false, color: this.props.vehicle.color });
      }
    }
  }
  validTextColour(stringToTest) {
    if (stringToTest === "") { return false; }
    if (stringToTest === "inherit") { return false; }
    if (stringToTest === "transparent") { return false; }
  
    var image = document.createElement("img");
    image.style.color = "rgb(0, 0, 0)";
    image.style.color = stringToTest;
    if (image.style.color !== "rgb(0, 0, 0)") { return true; }
    image.style.color = "rgb(255, 255, 255)";
    image.style.color = stringToTest;
    return image.style.color !== "rgb(255, 255, 255)";
  }
  render() {
    return (
        <div className='carInfo'>
        <div><h1>{this.props.vehicle.make} {this.props.vehicle.model} </h1></div>
        <div className='flexColumn'>
          {this.state.trueColor && <div className='colorBox' style={{'backgroundColor': this.props.vehicle.color}} />}
          {!this.state.trueColor && <p>{this.props.vehicle.color}</p>}
          <div>
            <div className='license'>
              <small className='noMargin'>license plate</small>
              <h4 className='noMargin'>{this.props.vehicle.licenseplate}</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default CarInfo;