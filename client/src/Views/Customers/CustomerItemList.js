import React from 'react';

 const CustomerItemList = (props) => {
  return( <div className="row">
          <div className="col-xs-1 col-sm-1 col-xs-offset-1 col-sm-offset-1">
            <i className="fa fa-flask fa-2x" aria-hidden="true"></i>
          </div>
          <div className="col-xs-3 col-sm-4">
            <h3 className="brand-name line_row_element">{ props.customer.firstName + " " + props.customer.lastName }</h3>
            <p>{props.customer.email}</p>
          </div>
          <div className="col-xs-1 col-sm-1">
            <h4>{props.customer.phoneNumber}</h4>
          </div>
          <div className="col-xs-2 col-sm-3">
            <h4>{props.customer.rnc}</h4>
          </div>
          <div className="col-xs-2 col-sm-2">
             <button  className="btn btn-default" onClick={() => {props.onClickEditdCustomer(props.customer._id) }}><i className="fa fa-pencil" aria-hidden="true"></i></button>
          </div>
   </div>
 );
}

export default CustomerItemList
