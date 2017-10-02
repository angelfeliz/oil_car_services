import React from 'react';


 const ProductItemList = (props) => {
  return( <div className="row">
          <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
            <i className="fa fa-flask fa-2x" aria-hidden="true"></i>
          </div>

          <div className="col-xs-11 col-sm-3 col-md-3 col-lg-3">
            <h3 className="brand-name line_row_element">{props.product.name_}</h3>
            <p>{props.product.model}</p>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-2">
            <h4>{props.product.api}</h4>
          </div>
          <div className="col-xs-4 col-sm-3 col-md-3 col-lg-3">
            <h4>{props.product.productType}</h4>
            <p>{props.product.materialType}</p>
          </div>

          <div className="col-xs-4 col-sm-2 col-md-2 col-lg-2">
            <button className="btn btn-default" onClick={() => { props.onClickProcessDisabledProduct(props.product._id) }}><i className="fa fa-times" aria-hidden="true"></i></button> <button  className="btn btn-default" onClick={() => {props.onClickEditdProduct(props.product._id) }}><i className="fa fa-pencil" aria-hidden="true"></i></button>
          </div>
   </div>
 );
}

export default ProductItemList
