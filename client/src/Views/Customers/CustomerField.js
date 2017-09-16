import React from 'react';
import NCFType from '../util/NCFType';

const CustomerField = (props) => {
  let customer = props.customer;
 return (  <div>
  <div className="form-group">
    <label className="sr-only"></label>
    <input onChange={(e)=>props.onChangeInput(e)} value={ customer.firstName } className="form-control" placeholder="Nombre" name="firstName" type="text"/>
   </div>

   <div className="form-group">
     <label className="sr-only"></label>
     <input onChange={(e)=>props.onChangeInput(e)} value={ customer.lastName } className="form-control" placeholder="Apellido" name="lastName" type="text"/>
    </div>

    <div className="form-group">
      {
        customer.rnc
        ?
        <NCFType
         onClickNcfType={props.onChangeNcfType}
        />
        :
        null
      }
      <label className="sr-only"></label>
      <input onChange={(e)=>props.onChangeInput(e)} value={ customer.rnc } className="form-control" placeholder="RNC" name="rnc" type="text"/>
     </div>

    <div className="row">

      <div className="col-sm-6 col-md-6 col-lg-6">
        <div className="form-group">
          <label className="sr-only"></label>
          <input onChange={(e)=>props.onChangeInput(e)} value={ customer.phoneNumber } className="form-control" placeholder="Telefono" name="phoneNumber" type="text"/>
         </div>
        </div>

      <div className="col-sm-6 col-md-6 col-lg-6">
        <div className="form-group">
          <label className="sr-only"></label>
          <input onChange={(e)=>props.onChangeInput(e)} value={ customer.email } className="form-control" placeholder="Email" name="email" type="text"/>
         </div>
       </div>
       </div>
       </div>
     )
}

export default CustomerField;
