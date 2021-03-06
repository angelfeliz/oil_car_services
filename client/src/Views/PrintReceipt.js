import React from 'react';
import ServicesCheckBox from './UtilsServices/ServicesCheckBox';
import TotalInputs from './util/TotalInputs.js';

const PrintReceipt = (props) => {

  let checkout = props.checkoutItem;
  let descCheckout = parseInt(checkout.descCheckout);
  let totalDesc = parseInt(checkout.totalDesc);
    let desc = 0.00;
  if(!isNaN(descCheckout) && !isNaN(totalDesc)) {
     desc = (descCheckout + totalDesc).toFixed(2);
  }

  return(
<div className="space_container">
  <div>
    <h3 className="company_name-print"><img className="logo" src={require('../logo_lubriserv_w.png')}/></h3>
    <p className="address-print">C/ Aut. Duarte Km.14, Pantoja Sto. Dgo. Rep. Dom.</p>
    <p className="phone-print">Tel.: 809-544-5555</p>
    <span className="pull-rigth">Fecha: {checkout.date}</span>
  </div>
  <h3 className="text-center">Factura</h3>
  <div >

  </div>
  <div className="cliente">
    <div className="">
      <h4 className="client_name">Cliente: {`${checkout.customer.firstName} ${checkout.customer.lastName}`}</h4>
      <p className="">
        Telefono: {checkout.phoneNumber}
      </p>
      <p>
        RNC: {checkout.rnc}
      </p>
    </div>
    <div className="pull-rigth payment">
      <p><span>Tipo de factura: </span>{checkout.paymentType}</p>
      <p><span>Forma de pago: </span>{checkout.paymentMethod}</p>
      {
        checkout.rnc
        ?
        <p><span>NCF: </span>{checkout.ncf}</p>
        :
        null
      }
    </div>
  </div>
  {
    checkout.vehicle.brand
    ?
    <div>
    <div className="vehicle">
      <div className="brand-vehicle">Marca: {checkout.vehicle.brand}</div>
      <div className="place_number-vehicle">Placa: {checkout.vehicle.numberPlace}</div>
      <div className="proximo_cambio-vehicle">Proximo cambio: {checkout.vehicle.numberPlace}</div>
    </div>
    <div className="vehicle">
      <div className="supervisor-vehicle">Supervisor: {checkout.vehicle.numberPlace}</div>
      <div className="mecanico-vehicle">Mecanico: {checkout.vehicle.numberPlace}</div>
    </div>
    </div>

    :
    null
  }
  <div className="services-space">
  {
    checkout.services == "cambio aceite"
    ?
    <div className="services_print">
     <ServicesCheckBox
       onChange={()=>{}}
       onChangeServicsInput={()=>{}}
       services= {checkout.services_check}
       //services_check = {checkout.services_check}
     />
</div>
     :
     null
  }
  </div>
  <div className="product-space">
      <table className="table striped">
        <thead>
          <tr>
            <th>#</th>
            <th>tipo de product</th>
            <th>Product</th>
            <th>Cantidad</th>
            <th>Itebis</th>
            <th>Precio</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {checkout.products.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.product_id}</td>
                <td>{item.productType}</td>
                <td>{item.name_}</td>
                <td>{item.quantity}</td>
                <td>{item.itebis}</td>
                <td>{item.price}</td>
                <td>{item.totalProduct}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
  </div>

  <TotalInputs
    totalBruto={checkout.totalBruto}
    onChangeInputDisc={()=>{}}
    totalDesc={desc}
    totalItebis={checkout.totalItebis}
    totalNeto={checkout.totalNeto}
  />
</div>)
}

export default PrintReceipt;
