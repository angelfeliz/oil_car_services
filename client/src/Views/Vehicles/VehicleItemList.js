import React from 'react';


 const VehicleItemList = (props) => {
  return( <div className="row">
          <div className="col-xs-1 col-sm-1 col-xs-offset-1 col-sm-offset-1">
            <i className="fa fa-flask fa-2x" aria-hidden="true"></i>
          </div>
          <div className="col-xs-3 col-sm-4">
            <h3 className="brand-name line_row_element">{props.vehicle.brand}</h3>
            <p>{props.vehicle.model}</p>
          </div>
          <div className="col-xs-1 col-sm-1">
            <h4>{props.vehicle.year}</h4>
          </div>
          <div className="col-xs-2 col-sm-3">
            <h4>{props.vehicle.numberPlace}</h4>
          </div>
          <div className="col-xs-2 col-sm-2">
            <button className="btn btn-default" onClick={() => { props.onClickProcessDisabledVehicle(props.vehicle._id) }}><i className="fa fa-times" aria-hidden="true"></i></button> <button  className="btn btn-default" onClick={() => {props.onClickEditdVehicle(props.vehicle._id) }}><i className="fa fa-pencil" aria-hidden="true"></i></button>
          </div>
   </div>
 );
}

export default VehicleItemList
