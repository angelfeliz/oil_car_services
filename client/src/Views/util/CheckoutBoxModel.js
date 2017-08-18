import React from 'react';

const CheckoutBoxModel  = (props) => {
  return(<div className="block_view">
    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 box_central">
      <h1>Total: ${props.total}</h1>
      <h3>{props.firstName +" "+ props.lastName}</h3>
      <p>props.services</p>
      <div className="row">
        <button onClick={() => props.cancelCheckOut()} className="btn btn-warning">Cancelar</button>
        <button onClick={() => {props.onClickConfirmedCheckout(props._id)}} className="btn btn-success">Procesar</button>
      </div>
    </div>
  </div>
)
}

export default CheckoutBoxModel;
