import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import CustomerField from '../Customers/CustomerField';
import ProductAndGeneralServicesSelectorGrid from '../UtilsServices/ProductAndGeneralServicesSelectorGrid';
import * as productAction from '../../actions/productsAction';
import * as generalServicesAction from '../../actions/generalServicesAction';
import { calculateTotal } from '../../utils/functions';

class GeneralServicesForm extends Component {
  constructor(props) {
    super(props);
  }

  onChangeProductType(e) {
    let productType = e.target.value;
    if(productType) {
      this.props.filterProduct(productType);
    }
  }
  onChangeInputCustomer = (e) => {
    if(e.target.value) {
      this.props.addCustomerProperty({
        property: [e.target.name],
        value: e.target.value
      });
    }
  }
  onProductAdd = () => {
    let general = this.props.generalServices;
    let pro = this.props.products.productList.find((item) => {
      if (item._id == general.item_select_id) {
        return item;
      }
    });
    let itebis_tmp = parseFloat(pro.price) * 0.18;
    let total_tmp = (parseFloat(pro.price) + parseFloat(itebis_tmp)) * parseInt(general.item_select_quantity);
    this.props.totalProperty((calculateTotal(itebis_tmp, parseFloat(pro.price), parseInt(general.item_select_quantity), parseInt(general.totalDesc))));

    this.props.addProduct({
      product_id: pro._id,
      productType: pro.typeProduct,
      name_: pro.name_,
      price: pro.price,
      quantity: general.item_select_quantity,
      itebis: itebis_tmp,
      totalProduct: total_tmp
    });
    //this.setState({...this.state, product_type_select:"", product_select_name:"", product_select_quantity:"", product_select_price:""});
   }
  onSelectProduct = (_id) => {
    let pro = this.props.products.productList.find((item) => {
      if (item._id == _id) {
        return item;
      }
    });
    this.props.selectItem({
        item_select_price: pro.price,
        item_select_id: pro._id,
        item_select_name: pro.name_
      });
  }
  onChangeItemFind = (e) => {
    if (e.target.value != undefined && e.target.value) {
      this.props.filterProduct(e.target.value);
    } else {
      this.props.loadProducts();
    }
  }
  onChangeProductQuantity = (e) => {
    let quantity = e.target.value;
    if(quantity) {
      this.props.changeItemQuantity(quantity);
    }
  }
  onSubmit = () => {
     this.props.saveGeneralServices(this.props.generealServices);
  }

  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    let general = this.props.generalServices;
    let products = this.props.products;
    if(general.isRedirect) {
      <Redirect to='/'/>
    }
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
        <CustomerField
           customer={general.customer}
           onChangeInput={this.onChangeInputCustomer}
          />
        <ProductAndGeneralServicesSelectorGrid
          isGeneralServicesOn = { general.isGeneralServicesOn }
          item_type_select = { general.item_type_select }
          item_select_quantity = { general.item_select_quantity }
          item_select_price = { general.item_select_price}
          item_select_name = { general.item_select_name }
          item_select_id = { general.item_select_id }

        onChangeProductType = { general.onChangeProductType }
        onChangeFind = { this.onChangeItemFind }
        list = { products.productList }
        onClickElementList = {this.onSelectProduct}
        onChangeProductQuantity = {this.onChangeProductQuantity}
        onProductAdd = {  this.onProductAdd }
        productsAdded = {  general.products }
      />
      <button className="btn btn-primary">Guardar</button>
      </form>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  generalServices: state.generalServices,
  products: state.products,
})

let mapDispatchToProps = (dispatch) => ({
  loadProducts: () => {
    dispatch(productAction.GetAllProducts());
  },
  filterProduct: (filter) => {
    dispatch(productAction.filteringProduct(filter));
  },
  addCustomerProperty: (customer) => {
    dispatch(generalServicesAction.addCustomerProperty(customer));
  },
  totalProperty: (totals) => {
    dispatch(generalServicesAction.setTotalGeneralProperty(totals));
  },
  selectItem: (item) => {
    dispatch(generalServicesAction.selectItem(item));
  },
  changeItemQuantity: (quantity) => {
    dispatch(generalServicesAction.setItemQuantity(quantity));
  },
  saveGeneralServices: (status) => {
    dispatch(generalServicesAction.saveGeneralServices(status));
  },
  addProduct: (product) => {
    dispatch(generalServicesAction.addProduct(product));
  }
})

GeneralServicesForm = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralServicesForm));

export default GeneralServicesForm;
