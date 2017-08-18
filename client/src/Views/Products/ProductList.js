import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as productAction from '../../actions/productsAction';
import ProductItemList from './ProductItemList';
import BoxModel from '../util/BoxModel';

class Products extends Component {
  constructor(props) {
    super(props);
    this.onClickProcessDisabledProduct = this.onClickProcessDisabledProduct.bind(this);
    this.onClickAcceptDisabled = this.onClickAcceptDisabled.bind(this);
    this.onClickCancelDisabled = this.onClickCancelDisabled.bind(this);
    this.onClickEditdProduct = this.onClickEditdProduct.bind(this);
    this.onChangeFilterProduct = this.onChangeFilterProduct.bind(this);
  }

  onClickEditdProduct(_id) {
    let product = this.props.products.productList.find(((item) => {
      if (item._id == _id) {
        return item;
      }
    }));
    this.props.stageWorkProduct(product);
    this.props.setForUpdateProduct(product.createdAt);
  }
  onClickProcessDisabledProduct(_id) {
    let product = this.props.products.productList.find(((item) => {
      if (item._id == _id) {
        return item;
      }
    }));
    this.props.stageWorkProduct(product);
    this.props.showProductDisabledModal();
  }
  onClickAcceptDisabled() {
    this.props.disabledProduct(this.props.products.product);
    this.props.resetStageProduct();
    this.props.showProductForm();
    this.props.showProductDisabledModal();
  }
  onClickCancelDisabled() {
    this.props.showProductDisabledModal();
    this.props.resetStageProduct();
    this.props.showProductForm();
  }

  onChangeFilterProduct(e) {
    if (e.target.value != undefined && e.target.value) {
      this.props.filteringProudct(e.target.value);
    } else {
      this.props.loadProducts();
    }
  }

  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    const products = this.props.products.productList;

    if (products.length == 0 && !this.props.products.isNoMatch) {
      return <div className="text-center">
        <h2>Lista de productos vacia</h2>
      </div>
    }
    return (
      <div className="container">
        {this.props.products.isDisabledModal
          ? (<BoxModel name={this.props.products.product.name_} onClickAccept={this.onClickAcceptDisabled} onClickCancel={this.onClickCancelDisabled}/>)
          : null}
        <h2 className="text-center">Product</h2>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xm-12">
            <div className="form-group">
              <label className="sr-only"></label>
              <input placeholder="Buscar..." className="form-control" type="text" onChange={(e) => this.onChangeFilterProduct(e)}/>
            </div>
          </div>
        </div>
        <div className="product-grid">
          {products.map((item, index) => {
            return (
              <div key={index}>
                <ProductItemList product={item} onClickProcessDisabledProduct={this.onClickProcessDisabledProduct} index={index} onClickEditdProduct={this.onClickEditdProduct} onClickProcessDisabledProduct={this.onClickProcessDisabledProduct}/>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {products: state.products}
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () => {
      dispatch(productAction.GetAllProducts());
    },
    filteringProudct: (filter) => {
      dispatch(productAction.filteringProduct(filter));
    },
    disabledProduct: (product) => {
      dispatch(productAction.disabledProduct(product))
    },
    stageWorkProduct: (product) => {
      dispatch(productAction.stageProduct(product))
    },
    showProductDisabledModal: () => {
      dispatch(productAction.showProductDisabledModal())
    },
    resetStageProduct: () => {
      dispatch(productAction.resetStageProduct())
    },
    setForUpdateProduct: (createdAt) => {
      dispatch(productAction.setForUpdateProduct(createdAt))
    },
    showProductForm: () => {
      dispatch(productAction.showProductForm());
    }
  }
}

const ProductList = withRouter(connect(mapStateToProps, mapDispatchToProps)(Products));

export default ProductList
