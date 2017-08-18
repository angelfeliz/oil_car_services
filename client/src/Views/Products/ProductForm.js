import React, {Component} from 'react';
import {connect} from 'react-redux';
import api from '../../api';
import * as productAction from '../../actions/productsAction';
import validateProduct from '../../utils/validateProduct';
import * as alerts from '../util/Alerts';
import { fuelType, productType } from '../../utils/objectAsList';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeInput(e) {
    if (e.target.value != undefined) {
      this.props.addProductItem({
        property: [e.target.name],
        value: e.target.value
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    let validation = validateProduct(this.props.products.product);
    if (validation == undefined) {
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
        elementsProductType.push(<option key={x} value={keysTypeProduct[x]}>{ productType[keysTypeProduct[x]] }</option>);
    }

    return (
      <div className="container">
        {this.props.products.didSaved
          ? <alerts.AlertSuccess text={"El product fue guardado sastifactoriamente"} />
          : null}
        <button className={this.props.products.isShowProductForm
          ? 'hideElement'
          : 'showElement btn btn-primary pull-right'} onClick={() => {
          this.props.showProductForm();
        }}>
          Agregar product
        </button>
        <div className={this.props.products.productErrors.length > 0
          ? 'showElement'
          : 'hideElement'}>
          {alerts.RenderErrorMessage(this.props.products.productErrors)}
        </div>
        <form method="post" className={this.props.products.isShowProductForm
          ? 'showElement'
          : 'hideElement'} onSubmit={e => { this.onSubmit(e)  }}>
          <h2>Nuevo producto</h2>
          <div className="form-group">
            <label className="sr-only">dd</label>
            <select name="typeProduct" value={this.props.products.product.typeProduct} onChange={(e) => this.onChangeInput(e)} className="form-control">
              <option value="">Tipo de producto</option>
              { elementsProductType }
            </select>
          </div>
          <div className="form-group">
            <label className="sr-only"></label>
            <input name="name_" value={this.props.products.product.name_} onChange={(e) => this.onChangeInput(e)} placeholder="Nombre" className="form-control"/>
          </div>
          <div className="form-group">
            <label className="sr-only"></label>
            <input name="model" value={this.props.products.product.model} onChange={(e) => this.onChangeInput(e)} placeholder="Modelo" className="form-control"/>
          </div>
          <div className="form-group">
            <label className="sr-only"></label>
            <select name="api" value={this.props.products.product.api} onChange={(e) => this.onChangeInput(e)} className="form-control">
              <option value="">Tipo combustible</option>
              { elementsFuel }
            </select>
          </div>
          <div className="form-group">
            <label className="sr-only"></label>
            <input name="price" value={this.props.products.product.price} onChange={(e) => this.onChangeInput(e)} placeholder="Precio" className="form-control"/>
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
