import React from 'react';

const PaymentType = (prop) => {
  return(
    <fieldset>
      <legend>Forma de pago</legend>
      <div className="col-xs-4 col-sm-3 col-md-2 col-lg-2">
        <div className="form-group">
          <label className="sr-only"></label>
          <input onChange={(e) => prop.onChangeInput(e)} className="" type="radio" name="paymentType" value="cash" /><span>Contado</span>
        </div>
      </div>
      <div className="col-xs-4 col-sm- col-md-2 col-lg-2">
        <div className="form-group">
          <label className="sr-only"></label>
          <input onChange={(e) => prop.onChangeInput(e)} className="" type="radio" name="paymentType" value="credit" /><span>Credito</span>
        </div>
      </div>
      </fieldset>
  )
}


export default PaymentType;
