import React from 'react';

function CarInfo(props){
    return (
        <div className='carInfo'>
        <div><h1>{props.vehicle.make} {props.vehicle.model} </h1></div>
        <div className='flexColumn'>
          <div className='colorBox' style={{'background-color':props.vehicle.color}}>
            </div>
          <div>
            <div className='license'>
              <small className='noMargin'>license plate</small>
              <h4 className='noMargin'>{props.vehicle.licenseplate}</h4>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CarInfo;