import React from 'react';

const BoxModel = (props) => {
    return (
        <div className="block_view">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 box_central">
                <h3>{props.name}</h3>
                <p>Quiere desabilitar este elemento?</p>
                <div className="button-container">
                    <button type="button" className="btn btn-info" onClick={() => props.onClickAccept()}>Aceptar</button>
                    <button type="button" className="btn btn-warning" onClick={() => props.onClickCancel()}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export const CheckoutBoxModel = (props) => {
  console.log('check', props.checkoutItem);
    let checkoutItem = props.checkoutItem;
    return (
        <div className="container block_view">
          <div className="inner-container">
            <div className="col-lg-10 col-md-2 col-sm-12 col-xs-12">
                <fieldset>
                    <legend>Tipo de pago</legend>
                    <div className="col-lg-1 col-md-2 col-sm-4 col-xs-4">
                        <div className="form-group">
                            <label className="sr-only"></label>
                            <input onClick={(e) => props.onClickPaymentType(e)} className="" type="radio" name="typePayment" value="cash"/>
                            <span>Contado</span>
                        </div>
                    </div>
                    <div className="col-lg-1 col-md-2 col-sm-4 col-xs-4">
                        <div className="form-group">
                            <label className="sr-only"></label>
                            <input onClick={(e) => props.onClickPaymentType(e)} className="" type="radio" name="typePayment" value="card"/>
                            <span>Tarjeta</span>
                        </div>
                    </div>
                </fieldset>
                <hr/>
                <div>
                    <div className="row text-center"><h1>Factura</h1></div>
                    <div className="row">
                      <span>{`RD$: ${checkoutItem.totalNeto}`} - <input type="text" onChange={(e)=>{props.onChangeDesc(e)}} className="input-control" placeholder="Desc" name="descCaja" value={props.descCaja}/> = {`RD$ ${props.totalCaja}`}</span>
                    </div>
                    <div className="row">
                      <h3>{`${checkoutItem.firstName} ${checkoutItem.lastName}`}</h3>
                    </div>
                    {checkoutItem.vehicle
                        ? <div>
                            <div className="row">
                                <div className="col-lg-2">
                                    <label>Marca</label>
                                    <p>{checkoutItem.vehicle.brand}</p>
                                 </div>
                                 <div className="col-lg-2">
                                     <label>Modelo</label>
                                     <p>{checkoutItem.vehicle.model}</p>
                                  </div>
                                  <div className="col-lg-2">
                                      <label>Year</label>
                                      <p>{checkoutItem.vehicle.year}</p>
                                   </div>
                             </div>
                             <hr/>
                            </div> : null}

                    <h3>Detalle</h3>
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
                          return(<tr>
                             <td>{item.name_}</td>
                             <td>{item.quantity}</td>
                             <td>${item.totalProduct}</td>
                           </tr>)
                         })
                       }
                         </tbody>
                       </table>
                    </div>
                    <div className="row">
                        <button className="btn btn-primary" onClick={props.onClickProcessCheckout}>Pagar</button>
                        <button onClick={props.onClickCancelCheckout} className="btn btn-warning">Cancelar</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default BoxModel;
