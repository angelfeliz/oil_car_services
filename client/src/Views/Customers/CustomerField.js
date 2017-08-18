import React from 'react';

const CustomerField = (props) => {
 return (  <div>
  <div className="form-group">
    <label className="sr-only"></label>
    <input onChange={(e)=>props.onChangeInput(e)} value={ props.firstName } className="form-control" placeholder="Nombre" name="firstName" type="text"/>
   </div>

   <div className="form-group">
     <label className="sr-only"></label>
     <input onChange={(e)=>props.onChangeInput(e)} value={ props.lastName } className="form-control" placeholder="Apellido" name="lastName" type="text"/>
    </div>

    <div className="form-group">
      <label className="sr-only"></label>
      <input onChange={(e)=>props.onChangeInput(e)} value={ props.rnc } className="form-control" placeholder="RNC" name="rnc" type="text"/>
     </div>

    <div className="row">

      <div className="col-sm-6 col-md-6 col-lg-6">
        <div className="form-group">
          <label className="sr-only"></label>
          <input onChange={(e)=>props.onChangeInput(e)} value={ props.phoneNumber } className="form-control" placeholder="Telefono" name="phoneNumber" type="text"/>
         </div>
        </div>

      <div className="col-sm-6 col-md-6 col-lg-6">
        <div className="form-group">
          <label className="sr-only"></label>
          <input onChange={(e)=>props.onChangeInput(e)} value={ props.email } className="form-control" placeholder="Email" name="email" type="text"/>
         </div>
       </div>
       </div>
       </div>
     )
}

export default CustomerField;
