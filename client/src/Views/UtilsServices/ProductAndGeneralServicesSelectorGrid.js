import React, {Component} from 'react';
import AutoCompleteDropBox from '../util/AutoCompleteDropBox';
import { productType } from '../../utils/objectAsList';
import HeadAutoComplete from '../util/HeadAutoComplete';

const ProductAndGeneralServicesSelectorGrid = (props) => {

    let keysTypeProduct = Object.keys(productType);
    let elementsProductType = [];
    for(let x = 0; x < keysTypeProduct.length; x++ ) {
        elementsProductType.push(<option key={x} value={productType[keysTypeProduct[x]]}>{ productType[keysTypeProduct[x]] }</option>);
    }

    if(props.isGeneralServicesOn) {
        elementsProductType.push(<option key={ elementsProductType.length + 1 } value={"Servicios extra"}>{ "Servicios extra" }</option>);
      }

    return (
      <fieldset>
        <legend>Productos</legend>
        <div className="row">
        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
          <div className="form-group">
            <label className="sr-only">dd</label>
            <select name="typeProduct" value={props.product_type_select} onChange={(e) => props.onChangeProductType(e)} className="form-control">
              <option value="">Tipo de producto</option>
              { elementsProductType }
            </select>
           </div>
         </div>

          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <div className="form-group">
              <HeadAutoComplete
                 select_item={ props.item_select_name }
                 onChangeFind={ props.onChangeFind }
                 list={ props.list }
                 onClickElementList={props.onClickElementList}
              />
            </div>
          </div>

          <div className="col-xs-6 col-sm-2 col-md-2 col-lg-2">
            <div className="form-group">
              <label className="sr-only">-</label>
              <input onChange={(e) => props.onChangeProductQuantity(e)} value={ props.item_select_quantity } className="form-control" placeholder="Cantidad" name="quantity_product" type="text"/>
            </div>
          </div>

          <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
            <div className="form-group">
              <label className="sr-only">-</label>
              <input className="form-control" placeholder="Precio" name="product_select_price" type="text" value={ props.item_select_price }   readOnly/>
            </div>
          </div>

          <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2">
            <div className="form-group">
              <label className="sr-only">-</label>
              <button className="btn btn-defatul" type="button" onClick={() => props.onProductAdd()}>Add</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
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
                {props.productsAdded.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.product_id}</td>
                      <td>{item.typeProduct}</td>
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
        </div>
      </fieldset>
    )
}
export default ProductAndGeneralServicesSelectorGrid;
