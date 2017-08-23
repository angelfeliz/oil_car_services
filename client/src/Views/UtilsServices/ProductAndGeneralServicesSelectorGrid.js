import React, {Component} from 'react';
import AutoCompleteDropBox from '../util/AutoCompleteDropBox';
import { productType } from '../../utils/objectAsList';

class ProductAndGeneralServicesSelectorGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropBoxOpen: false
    };
    this.onClickShowDropBox = this.onClickShowDropBox.bind(this);
    this.onClickProduct = this.onClickProduct.bind(this);
  }

  onClickShowDropBox = () => {
    this.setState({
      ...this.state,
      dropBoxOpen: !this.state.dropBoxOpen
    })
  }
  onClickProduct(_id) {
    this.onClickShowDropBox();
    this.props.onChangeProduct(_id);
  }
  render() {
    let keysTypeProduct = Object.keys(productType);
    let elementsProductType = [];
    for(let x = 0; x < keysTypeProduct.length; x++ ) {
        elementsProductType.push(<option key={x} value={productType[keysTypeProduct[x]]}>{ productType[keysTypeProduct[x]] }</option>);
    }

    {
      if(this.props.isGeneralServicesOn) {
          elementsProductType.push(<option key={ elementsProductType.length + 1 } value={"Servicios extra"}>{ "Servicios extra" }</option>);
      }
  }

    return (
      <fieldset>
        <legend>Productos</legend>
        <div className="row">

        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
          <div className="form-group">
            <label className="sr-only">dd</label>
            <select name="typeProduct" value={this.props.product_type_select} onChange={(e) => this.props.onChangeProductType(e)} className="form-control">
              <option value="">Tipo de producto</option>
              { elementsProductType }
            </select>
           </div>
         </div>

          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <div className="form-group">

              <span className="input-group">
                <span onClick={this.onClickShowDropBox} className="form-control spanLookInput">{this.props.product_select_name}</span>
                <span onClick={this.onClickShowDropBox} className="input-group-addon">
                  <i className="fa fa-angle-down" aria-hidden="true"></i>
                </span>
              </span>

              <span className={this.state.dropBoxOpen == true
                ? "drop-open"
                : "form-control drop-close"}>
                <input className="form-control" type="text" onChange={(e) => this.props.onChangeFindProduct(e)}/>
              </span>

              <span className={this.state.dropBoxOpen == true
                ? "drop-open"
                : "form-control drop-close"}>
                <AutoCompleteDropBox list={this.props.products} onClick={this.onClickProduct}/>
              </span>
            </div>
          </div>

          <div className="col-xs-6 col-sm-2 col-md-2 col-lg-2">
            <div className="form-group">
              <label className="sr-only">-</label>
              <input onChange={(e) => this.props.onChangeProductQuantity(e)} value={ this.props.product_select_quantity } className="form-control" placeholder="Cantidad" name="quantity_product" type="text"/>
            </div>
          </div>

          <div className="col-xs-6 col-sm-4 col-md-2 col-lg-2">
            <div className="form-group">
              <label className="sr-only">-</label>
              <input className="form-control" placeholder="Precio" name="product_select_price" type="text" value={ this.props.product_select_price }   readOnly/>
            </div>
          </div>

          <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2">
            <div className="form-group">
              <label className="sr-only">-</label>
              <button className="btn btn-defatul" type="button" onClick={() => this.props.onProductAdd()}>Add</button>
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
                {this.props.productsAdded.map((item, index) => {
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
}
export default ProductAndGeneralServicesSelectorGrid;
