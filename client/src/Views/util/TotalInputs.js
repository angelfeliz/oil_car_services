import React from 'react';
import PropTypes from 'prop-types';

const TotalInputs = (props) => (
  <div>
  <div className="row top-money">
     <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 pull-right">
       <div className="form-group">
         <label className="sr-only"></label>
           <input className="form-control" placeholder="Total bruto" name="total_bruto" type="text" value={props.totalBruto} readOnly/>
       </div>
     </div>
   </div>

   <div className="row">
     <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 pull-right">
       <div className="form-group">
         <label className="sr-only"></label>
         <span className="input-group">
           <span className="input-group-addon">$</span><input onChange={(e) => props.onChangeInputDisc(e)} className="form-control" placeholder="desc" name="percent_disc" type="text" value={props.totalDesc}/>
         </span>
       </div>
     </div>
   </div>

   <div className="row">
     <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 pull-right">
       <div className="form-group">
         <label className="sr-only"></label>
         <input className="form-control" placeholder="itebis" name="ptotal_itebis" type="text" value={props.totalItebis} readOnly/>
       </div>
     </div>
   </div>

   <div className="row">
     <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 pull-right">
       <div className="form-group">
         <label className="sr-only"></label>
         <input className="form-control" placeholder="total neto" name="total_neto" type="text" value={props.totalNeto} readOnly/>
       </div>
     </div>
   </div>
   </div>
)

TotalInputs.propType = {
  totalBruto: PropTypes.number,
  onChangeInputDisc: PropTypes.func,
  totalDesc: PropTypes.number,
  totalItebis: PropTypes.number,
  totalNeto: PropTypes.number
}

export default TotalInputs;
