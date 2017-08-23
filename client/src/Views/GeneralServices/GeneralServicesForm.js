import React, { Component } from 'react';
import CustomerField from '../Customer/CustomerField';
import ProductAndGeneralServicesSelectorGrid from '../UtilsServices/GeneralServicesForm';
import * as productAction from '../../actions/productsAction';
import * as generalServicesAction from '../../actions/generalServicesAction';
import { calculateTotal } from '../../utils/functions';

class GeneralServicesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_select_price: '',
      product_select: '',
      product_select_quantity: '',
      product_select_name: 'seleccione producto',
      product_type_select: '',
    }
  }

  onChangeProductType(e) {
    let productType = e.target.value;
    if(productType) {
      this.props.filterProduct(productType);
    }
  }
  onChangeInputCustomer = (e) => {
    if(e.target.value) {
      this.props.addCustomerServerCustomer({
        property: [e.target.name],
        value: e.target.value
      });
    }
  }
  onProductAdd = () => {
    let pro = this.products.find((item) => {
      if (item._id == this.state.product_select) {
        return item;
      }
    });
    let itebis_tmp = parseFloat(pro.price) * 0.18;
    let total_tmp = (parseFloat(pro.price) + parseFloat(itebis_tmp)) * parseInt(this.state.product_select_quantity);
    this.props.totalProperty((calculateTotal(itebis_tmp, parseFloat(pro.price), parseInt(this.state.product_select_quantity), parseInt(this.state.totalDesc))));

    this.props.addProduct({
      product_id: pro._id,
      typeProduct: pro.typeProduct,
      name_: pro.name_,
      price: pro.price,
      quantity: this.state.product_select_quantity,
      itebis: itebis_tmp,
      totalProduct: total_tmp
    });
    //this.setState({...this.state, product_type_select:"", product_select_name:"", product_select_quantity:"", product_select_price:""});
  }
  onSelectProduct = (_id) => {
    let pro = this.products.find((item) => {
      if (item._id == _id) {
        return item;
      }
    });
    this.props.selectProduct({
        item_select_price: pro.price,
        item_select_id: pro._id,
        item_select_name: pro.name_
      });
  }
  onChangeItemFind = (e) => {
    if (e.target.value != undefined && e.target.value) {
      this.props.filteringProudct(e.target.value);
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

  render() {
    let general = this.props.generalServicesForm;
    let products = this.props.products;
    return (
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
        list = { products.productArray }
        onClickElementList = {this.onSelectProduct}
        onChangeProductQuantity = {this.onChangeProductQuantity}
        onProductAdd = {  onProductAdd }
        productsAdded = {  productsAdded }
      />
    )
  }
}

let mapStateToProps = (state) => ({
  generalServicesForm: state.generalServicesForm,
  products: state.products,
})

let mapDispatchToProps = (dispatch) => ({
  loadProducts: () => {
    dispatch(productAction.GetAllProducts());
  },
  filterProduct: (filter) => {
    dispatch(productAction.filteringProduct(filter));
  },
  addCustomerServerCustomer: (customer) => {
    dispatch(generalServicesAction.addCustomerProperty(customer));
  },
  totalProperty: (totals) => {
    dispatch(generalServicesAction.setTotalGeneralProperty(totals));
  },
  selectItem: (item) => {
    dispatch(generalServicesAction.selectProduct(item));
  },
  changeItemQuantity: (quantity) => {
    dispatch(generalServicesAction.setItemQuantity(quantity));
  }
}

GeneralServicesForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralServicesForm);

})
