import React from 'react';
import ServicesCheckBox from './UtilsServices/ServicesCheckBox';

const PrintReceipt = (props) => {
  let checkout = props.checkoutItem;
  console.log('checkoutprint ',checkout);
  return(
<div className="">
  <div>
    <h3 className="company_name-print"><i className="fa fa-server" aria-hidden="true"></i>LubriserServ</h3>
    <p className="address-print">C/ Aut. Duarte Km.14, Pantoja Sto. Dgo. Rep. Dom.</p>
    <p className="phone-print">Tel.: 809-544-5555</p>
    <span className="pull-rigth">Fecha: 10-09-2016</span>
  </div>
  <h3 className="text-center">Factura</h3>
  <div >

  </div>
  <div className="cliente">
    <div className="">
      <h4>{`${checkout.firstName} ${checkout.lastName}`}</h4>
      <p className="phone-print">
        {checkout.phoneNumber}
      </p>
    </div>
    <div className="pull-rigth">
      <p><span>Tipo de factura: </span>{checkout.paymentType}</p>
      <p><span>Forma de pago: </span>{checkout.paymentMethod}</p>
    </div>
  </div>
  {
    checkout.vehicle
    ?
    <div className="vehicle">

    </div>
    :
    null
  }
  {
    checkout.services == "cambio aceite"
    ?
     <ServicesCheckBox
     onChange={()=>{}}
     onChangeServicsInput={()=>{}}
     services = {{}}
     />
     :
     null
  }
</div>)
}

export default PrintReceipt;
