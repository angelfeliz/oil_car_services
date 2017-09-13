import React from 'react';
import { fuelType } from '../../utils/objectAsList';

export const VehicleField = (props) => {
  let keysFuel = Object.keys(fuelType);
  let elementsFuel = [];

  for(let x = 0; x < keysFuel.length; x++ ) {
    if(fuelType[keysFuel[x]] != "diesel/gasolina" && fuelType[keysFuel[x]] != "no aplica") {
      elementsFuel.push(<option key={x} value={keysFuel[x]}>{ fuelType[keysFuel[x]] }</option>);
    }
  }

  return(
    <div>
<div className='row'>

  <div className="col-sm-4 col-md-4">
    <div className="form-group">
      <label className="sr-only"></label>
      <input onChange={(e)=>props.onChange(e)} value={ props.brand } className="form-control" placeholder="Marca" name="brand" type="text"/>
     </div>
  </div>

  <div className="col-sm-4 col-md-4">
    <div className="form-group">
      <label className="sr-only"></label>
      <input onChange={(e)=>props.onChange(e)} value={ props.model } className="form-control" placeholder="Modelo" name="model" type="text"/>
    </div>
  </div>

  <div className="col-sm-4 col-md-4">
    <div className="form-group">
      <label className="sr-only"></label>
      <input onChange={(e)=>props.onChange(e)} value={ props.numberPlace } className="form-control" placeholder="Placa" name="numberPlace" type="text"/>
    </div>
  </div>
</div>
  <div className="row">

  <div className="col-sm-4 col-md-4">
    <div className="form-group">
      <label className="sr-only"></label>
      <input onChange={(e)=>props.onChange(e)} value={ props.year } className="form-control" placeholder="Ano" name="year" type="text"/>
    </div>
  </div>

  <div className="col-sm-4 col-md-4">
  <div className="form-group">
    <label className="sr-only"></label>
    <select placeholder="Tipo combustible" name="typeFuel" value={ props.typeFuel } onChange={(e)=>props.onChange(e)} className="form-control">
      <option value="tipo de combustible">tipo de combustible</option>
      { elementsFuel }
    </select>
  </div>
  </div>

  <div className="col-sm-4 col-md-4">
     <div className="form-group">
        <label className="sr-only"></label>
        <input onChange={(e)=>props.onChange(e)} value={ props.km } className="form-control" placeholder="Kilometraje" name="km" type="text"/>
      </div>
    </div>
  </div>

<div className="row">
  <div className="col-sm-4 col-md-4">
    <div className="form-group">
      <label className="sr-only"></label>
      <input onChange={(e)=>props.onChange(e)} value={ props.nextKm } className="form-control" placeholder="Proximo cambio" name="nextKm" type="text"/>
     </div>
   </div>

 </div>
 </div>
 )}

 export default VehicleField;
