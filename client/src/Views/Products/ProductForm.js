import React, {Component} from 'react';
import {connect} from 'react-redux';
import api from '../../api';
import * as productAction from '../../actions/productsAction';
import validateProduct from '../../utils/Validations/validateProduct';
import {RenderErrorMessage, AlertSuccess} from '../util/Alerts';
import { fuelType, productType } from '../../utils/objectAsList';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  calculatePrice = (e) => {
    var cost = parseFloat(e.target.value);
    if(typeof cost == "number" && !isNaN(cost)) {
       var itebis = parseFloat(cost * 0.18).toFixed(2);
       var total = cost + parseFloat(itebis);
       this.props.addPrice({cost, itebis, total});
    }else if(isNaN(cost) && e.target.value == ''){
      this.props.addPrice({cost:'', itebis:'', total:''});
    }
  }

  onChangeInput(e) {
    if (e.target.value != undefined) {
      this.props.addProductItem({
        property: [e.target.name],
        value: e.target.value
      });
    }
  }

  onChangeInputProductType = (e)=> {
    if (e.target.value != undefined) {
      this.props.addProductItem({
        property: [e.target.name],
        value: e.target.value
      });
    }
    if(e.target.value !== "aceite_de_motor") {
      this.props.addProductItem({property: "materialType", value:''});
    }
  }


  onSubmit(e) {
    e.preventDefault();
    let validation = validateProduct(this.props.products.product);
    let duplicateName = this.props.products.productList.find((item => {
      return item.name_ === this.props.products.product.name_
    }));

    if(duplicateName) {
      let errObj = {duplicado: "Existe un producto con este nombre"};
      validation = {...validation, errObj};
    }

    if (validation == undefined ) {
      if(this.props.products.product.createdAt) {
        this.props.updateProduct(this.props.products.product);
      }
      else {
        this.props.saveProduct(this.props.products.product);
      }
    } else {
      let errorList = [];
      let keyArray = Object.keys(validation);
      for (let item = 0; item < keyArray.length; item++) {
        let innerKey = Object.keys(validation[keyArray[item]]);
        for (let x = 0; x < innerKey.length; x++) {
          errorList.push(validation[keyArray[item]][innerKey[x]]);
        }
      }
      this.props.addProductErrors(errorList);
    }
    window.scrollTo(1000, 0);
  }

componentWillUnmount(){
   this.props.cleanProductsStateUnMount();
}
  render() {
    let keysFuel = Object.keys(fuelType);
    let keysTypeProduct = Object.keys(productType);
    let elementsFuel = [];
    let elementsProductType = [];

    for(let x = 0; x < keysFuel.length; x++ ) {
        elementsFuel.push(<option key={x} value={keysFuel[x]}>{ fuelType[keysFuel[x]] }</option>);
    }

    for(let x = 0; x < keysTypeProduct.length; x++ ) {
        elementsProductType.push(<option key={x} value={productType[keysTypeProduct[x]]}>{ productType[keysTypeProduct[x]] }</option>);
    }

    return (
      <div className="container">
        {this.props.products.didSaved
          ? <AlertSuccess text={"El product fue guardado sastifactoriamente"} />
          : null}
        <button className={this.props.products.isShowProductForm
          ? 'hideElement'
          : 'showElement btn btn-primary pull-right'} onClick={() => {
          this.props.showProductForm();
        }}>
          Agregar product
        </button>
        {this.props.products.productErrors.length > 0 ?  <RenderErrorMessage errors={this.props.products.productErrors}/> : null }
        <form method="post" className={this.props.products.isShowProductForm
          ? 'showElement'
          : 'hideElement'} onSubmit={e => { this.onSubmit(e)  }}>
          <h2>Nuevo producto</h2>
          <div className="form-group">
            <label className="">Tipo de producto</label>
            <select name="productType" value={this.props.products.product.productType} onChange={(e) => this.onChangeInputProductType(e)} className="form-control">
              <option value="">Tipo de producto</option>
              { elementsProductType }
            </select>
          </div>

          {this.props.products.product.productType === "aceite_de_motor"
            ?
            <div>
          <div className="radio-inline">
            <label>
              <input type="radio" name="materialType" value="mineral" onChange={(e) => this.onChangeInput(e)} checked={this.props.products.product.materialType === "mineral"}/>
                Mineral
              </label>
          </div>
          <div className="radio-inline">
            <label>
              <input type="radio" name="materialType" value="semi-sintetico" onClick={(e) => this.onChangeInput(e)} checked={this.props.products.product.materialType === "semi-sintetico"}/>
                Semi-sintetico
              </label>
          </div>
          <div className="radio-inline">
            <label>
              <input type="radio" name="materialType" value="sintetico" onClick={(e) => this.onChangeInput(e)} checked={this.props.products.product.materialType === "sintetico"}/>
                Sintetico
              </label>
          </div>
          </div>
          :
            null
          }

          <div className="form-group">
            <label className="">Nombre</label>
            <input type="text" name="name_" value={this.props.products.product.name_} onChange={(e) => this.onChangeInput(e)} placeholder="Nombre" className="form-control"/>
          </div>
          <div className="form-group">
            <label className="">Modelo</label>
            <input type="text" name="model" value={this.props.products.product.model} onChange={(e) => this.onChangeInput(e)} placeholder="Modelo" className="form-control"/>
          </div>
          <div className="form-group">
            <label className="">Tipo combustible</label>
            <select name="api" value={this.props.products.product.api} onChange={(e) => this.onChangeInput(e)} className="form-control">
              <option value="">Tipo combustible</option>
              { elementsFuel }
            </select>
          </div>
          <div className="form-group">
            <label className="">Costo</label>
            <input type="text" name="cost" value={this.props.products.product.cost} onChange={(e) => this.calculatePrice(e)} placeholder="Costo" className="form-control"/>
          </div>
          <div className="form-group">
            <label className="">Itebis</label>
            <input type="text" name="itebis" value={this.props.products.product.itebis} readOnly placeholder="Itebis" className="form-control"/>
          </div>
          <div className="form-group">
            <label className="">Precio</label>
            <input type="text" name="price" value={this.props.products.product.price} readOnly placeholder="Precio" className="form-control"/>
          </div>
          <button type="submit" className="btn btn-success pull-right">Guardar</button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {products: state.products}
}

const mapStateToDispatch = (dispatch) => {
  return {
    addPrice(prices) {
      dispatch(productAction.addPrices(prices));
    },
    saveProduct(stateForm) {
      dispatch(productAction.saveProduct(stateForm));
    },
    cleanProductsStateUnMount() {
      dispatch(productAction.cleanProductsState())
    },
    showProductForm: () => {
      dispatch(productAction.showProductForm());
    },
    addProductErrors: (errorList) => {
      dispatch(productAction.addProductErrors(errorList));
    },
    addProductItem: (product) => {
      dispatch(productAction.addProductItem(product));
    },
    updateProduct: (product) => {
      dispatch(productAction.updateProduct(product));
    }
  }
}

ProductForm = connect(mapStateToProps, mapStateToDispatch)(ProductForm);

export default ProductForm
