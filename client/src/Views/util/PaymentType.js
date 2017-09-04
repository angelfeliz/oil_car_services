import React from 'react';

const PaymentType = (props) => {
  let isCash;
  let isCredit;
  if(props.paymentType === "credit"){    
    isCash = false;
    isCredit = true;
  }
  return(
    <fieldset>
      <legend>Forma de pago</legend>
      <div className="col-xs-4 col-sm-3 col-md-2 col-lg-2">
        <div className="form-group">
          <label className="sr-only"></label>
          <input onClick={(e) => props.onChangeInput(e)}  type="radio" name="paymentType" value="cash" checked={isCash} defaultChecked /><span> Contado</span>
        </div>
      </div>
      <div className="col-xs-4 col-sm- col-md-2 col-lg-2">
        <div className="form-group">
          <label className="sr-only"></label>
          <input onClick={(e) => props.onChangeInput(e)}  type="radio" name="paymentType" value="credit" checked={isCredit} /><span> Credito</span>
        </div>
      </div>
      </fieldset>
  )
}


export default PaymentType;
