import React from 'react';

export const BoxModel = (props) => {
  return (
    <div className="block_view">
      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 box_central">
        <h3>{props.name}</h3>
        <p>{props.text}}</p>
        <div className="button-container">
          <button type="button" className="btn btn-info" onClick={() => props.onClickAccept()}>Aceptar</button>
          <button type="button" className="btn btn-warning" onClick={() => props.onClickCancel()}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

export const CheckoutBoxModel = (props) => {
  let checkoutItem = props.checkoutItem;
  console.log('checkout check ', checkoutItem.consumidorFinal);
  return (
    <div className="container block_view">
      <div className="inner-container">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <fieldset>
            <legend>Tipo de pago</legend>
            <div className="col-lg-2 col-md-2 col-sm-4 col-xs-4">
              <div className="form-group">
                <label className="sr-only"></label>
                <input onClick={(e) => props.onClickPaymentType(e)} className="" type="radio" name="typePayment" value="cash" defaultChecked/>
                <span className="font-payment-type"> Contado <i className="fa fa-money" aria-hidden="true"></i></span>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-4 col-xs-4">
              <div className="form-group">
                <label className="sr-only"></label>
                <input onClick={(e) => props.onClickPaymentType(e)} className="" type="radio" name="typePayment" value="card"/>
                <span className="font-payment-type"> Tarjeta <i className="fa fa-credit-card" aria-hidden="true"></i></span>
              </div>
            </div>
          </fieldset>
          <hr/>
          <div className="row">
            <div className="checkbox">
              <label>
                <input type="checkbox" name="consumidorFinal" checked={checkoutItem.consumidorFinal} value=""  onClick={() => {props.onClickConsumidorFinal()}}/>
                Consumidor final
              </label>
            </div>
          </div>
          <div className="row">
            <div className="row text-center">
              <h1>Factura</h1>
            </div>
            <div className="row">
              <p className="text-right">{checkoutItem.date}</p>
              <h3 className="pull-right black_box"><span>Servicio: </span>{checkoutItem.services}</h3>
            </div>
            <div className="row">
              <h3>{`${checkoutItem.customer.firstName} ${checkoutItem.customer.lastName}`}</h3>
            </div>
            {checkoutItem.vehicle
              ? <div>
                  <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                      <label>Marca</label>
                      <p>{checkoutItem.vehicle.brand}</p>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                      <label>Modelo</label>
                      <p>{checkoutItem.vehicle.model}</p>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                      <label>Year</label>
                      <p>{checkoutItem.vehicle.year}</p>
                    </div>
                  </div>
                  <hr/>
                </div>
              : null}

            <h3 className="text-center">Detalle</h3>
            <div className="detail_checkout">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {checkoutItem.products.map((item) => {
                    return (
                      <tr>
                        <td>{item.name_}</td>
                        <td>{item.quantity}</td>
                        <td>${item.totalProduct}</td>
                      </tr>
                    )
                    })
                  }
                </tbody>
              </table>
            </div>
            <div className="row pull-right total_checkout">
              <span>{`$ ${checkoutItem.totalNeto} - `}<input type="text" onChange={(e) => {props.onChangeDesc(e) }} className="input-control" placeholder="Desc" name="descCaja" value={checkoutItem.descCheckout}/>
                = {`$ ${checkoutItem.totalNeto - checkoutItem.descCheckout}`}</span>
            </div>
            <div className="row checkout_button">
              <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12">
              {props.checkoutItem.paymentMethod ?
                      <button   className="btn btn-primary" onClick={() => props.onClickConfirmCheckout()}>Pagar</button>
                      :
                        <button disabled  className="btn btn-primary">Pagar</button>
              }

              </div>
              <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12">
                <button onClick={()=>props.onClickCancelCheckout()} className="btn btn-warning">Cancelar</button>
              </div>
            </div>
          </div>
        </div>{/*inner container*/}
      </div>
    </div>
  )
}
