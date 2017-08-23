import React from 'react';


const BoxModel = (props) => {
  return(<div className="block_view">
    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 box_central">
      <h3>{ props.name }</h3>
      <p>Quiere desabilitar este elemento?</p>
      <div className="button-container">
         <button type="button" className="btn btn-info" onClick={ () => props.onClickAccept() }>Aceptar</button>   <button type="button" className="btn btn-warning" onClick={ () => props.onClickCancel() }>Cancelar</button>
      </div>
    </div>
  </div>)
}

export const CheckoutBoxModel = (props) => {
  return (
    <div className="block_view">
      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 box_central">
        <fieldset>
          <legend>Tipo de pago</legend>
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
            <div className="form-group">
              <label className="sr-only"></label>
              <input onClick={(e) => props.onClickPaymentType(e)} className="" type="radio" name="typePayment" value="cash" /><span>Contado</span>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
            <div className="form-group">
              <label className="sr-only"></label>
              <input onClick={(e) => this.onClickPaymentType(e)} className="" type="radio" name="typePayment" value="card" /><span>Tarjeta</span>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Verificación</legend>
          <h3>{ `${props.firstName} + ${props.lastName}` } {`Total: ${props.total}`}</h3>
          <p>Detalle</p>
          <hr/>
          <div className="detail_checkout">
          {
            props.products.map((item) => {
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  { item.productName }
                 </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  { item.quantity }
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  ${ item.price }
                </div>
              </div>
          })
        }
        </div>
        <div className="row">
        <button className="btn btn-primary" onClick={ props.onClickProcessCheckout }>Pagar</button> <button onClick={props.onClickCancelCheckout} className="btn btn-warning">Cancelar</button>
        </div>
        </fieldset>


      </div>
    </div>
  )
}

export default BoxModel;
