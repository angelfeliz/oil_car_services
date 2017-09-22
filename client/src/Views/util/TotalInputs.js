import React from 'react';
import PropTypes from 'prop-types';

const TotalInputs = (props) => (
  <div className="flex_container">
    <div className="flex_container_column_text">
     <div className="squard_div">
      <p className="item">Bruto</p>
    </div>
    <div className="squard_div">
     <p className="item">Desc</p>
   </div>
   <div className="squard_div">
    <p className="item">Itebis</p>
  </div>
  <div className="squard_div">
   <p className="item">Neto</p>
 </div>
    </div>
    <div className="flex_container_column_input">
      <div className="squard_div">
        <span className="input-group">
          <span className="input-group-addon print-input">$</span><input className="print-input form-control" placeholder="Total bruto" name="total_bruto" type="text" value={props.totalBruto} readOnly/>
        </span>
      </div>
      <div className="squard_div">
          <span className="input-group">
            <span className="input-group-addon print-input">$</span><input onChange={(e) => props.onChangeInputDisc(e)} className="print-input form-control" placeholder="desc" name="percent_disc" type="text" value={props.totalDesc}/>
         </span>
      </div>
      <div className="squard_div">
          <span className="input-group">
            <span className="input-group-addon print-input">$</span><input className="print-input form-control" placeholder="itebis" name="ptotal_itebis" type="text" value={props.totalItebis} readOnly/>
         </span>
      </div>
      <div className="squard_div">
          <span className="input-group">
            <span className="input-group-addon print-input">$</span><input className="form-control print-input" placeholder="total neto" name="total_neto" type="text" value={props.totalNeto} readOnly/>
         </span>
      </div>
    </div>

  </div>


    /*{ <div className="col-lg-3 col-md-12 col-sm-4 col-xs-4 pull-right  form-inline">
       <div className="form-group">
         <label className="">Bruto</label>
         <span className="input-group">
           <span className="input-group-addon print-input">$</span><input className="print-input form-control" placeholder="Total bruto" name="total_bruto" type="text" value={props.totalBruto} readOnly/>
          </span>
       </div>
     </div>
   </div>

   <div className="row">
     <div className="col-lg-3 col-md-12 col-sm-4 col-xs-4 pull-right form-inline">
       <div className="form-group print-pull-right">
         <label className="">Desc</label>
         <span className="input-group">
           <span className="input-group-addon print-input">$</span><input onChange={(e) => props.onChangeInputDisc(e)} className="print-input form-control" placeholder="desc" name="percent_disc" type="text" value={props.totalDesc}/>
         </span>
       </div>
     </div>
   </div>

   <div className="row">
     <div className="col-lg-3 col-md-8 col-sm-4 col-xs-4 pull-right form-inline">
       <div className="form-group print-pull-right">
         <label className="">Itebis</label>
         <span className="input-group">
           <span className="input-group-addon print-input">$</span><input className="print-input form-control" placeholder="itebis" name="ptotal_itebis" type="text" value={props.totalItebis} readOnly/>
          </span>
       </div>
     </div>
   </div>

   <div className="row">
     <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 pull-right form-inline">
       <div className="form-group print-pull-right">
         <label className="">Neto</label>
         <span className="input-group">
           <span className="input-group-addon print-input">$</span><input className="form-control print-input" placeholder="total neto" name="total_neto" type="text" value={props.totalNeto} readOnly/>
        </span>
       </div>
     </div>
   </div>
   </div>}*/
)

TotalInputs.propType = {
  totalBruto: PropTypes.number,
  onChangeInputDisc: PropTypes.func,
  totalDesc: PropTypes.number,
  totalItebis: PropTypes.number,
  totalNeto: PropTypes.number
}

export default TotalInputs;
