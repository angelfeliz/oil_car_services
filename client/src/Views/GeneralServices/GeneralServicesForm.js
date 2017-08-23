import React, { Component } from 'react';
import CustomerField from '../Customer/CustomerField';
import ProductAndGeneralServicesSelectorGrid from '../UtilsServices/GeneralServicesForm';
import * as productAction from '../../actions/productsAction';
import * as generalServicesAction from '../../actions/generalServicesAction';

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
      this.props.filteringProudct(productType);
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
    this.CalculateTotal(itebis_tmp, parseFloat(pro.price), parseInt(this.state.product_select_quantity), parseInt(this.state.totalDesc));

    this.props.addCustomerServerProduct({
      product_id: pro._id,
      typeProduct: pro.typeProduct,
      name_: pro.name_,
      price: pro.price,
      quantity: this.state.product_select_quantity,
      itebis: itebis_tmp,
      totalProduct: total_tmp
    });
    this.setState({...this.state, product_type_select:"", product_select_name:"", product_select_quantity:"", product_select_price:""});
  }
  onProductChangeInput(_id) {
    let pro = this.products.find((item) => {
      if (item._id == _id) {
        return item;
      }
    });
    this.setState({
      ...this.state,
      product_select_price: pro.price,
      product_select: pro._id,
      product_select_name: pro.name_
    });
  }
  onChangeFindProduct = (e) => {
    if (e.target.value != undefined && e.target.value) {
      this.props.filteringProudct(e.target.value);
    } else {
      this.props.loadProducts();
    }
  }
  onClickElementList = () => { }

  onChangeProductQuantity = () => {}

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
        product_type_select = { general.product_type_select }
        product_select_quantity = { general.product_select_quantity }
        product_select_price = { general.product_select_price}
        onChangeProductType = { general.onChangeProductType }
        select_item = { general.select_item }
        onChangeFind = { general.onChangeFind }
        list = { products.productArray }
        onClickElementList = {this.onClickElementList}
        onChangeProductQuantity = {this.onChangeProductQuantity}
        onProductAdd = {  onProductAdd}
        productsAdded = {  productsAdded}
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
  addCustomerServerCustomer: (customer) => {
    dispatch(generalServicesAction.addCustomerProperty(customer));
  }
}
GeneralServicesForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralServicesForm);

})
