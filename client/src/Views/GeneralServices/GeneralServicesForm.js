import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import CustomerField from '../Customers/CustomerField';
import ProductAndGeneralServicesSelectorGrid from '../UtilsServices/ProductAndGeneralServicesSelectorGrid';
import * as productAction from '../../actions/productsAction';
import * as generalServicesAction from '../../actions/generalServicesAction';
import { calculateTotal, validationSpread, calculateWithLabor } from '../../utils/functions';
import PaymentType from '../util/PaymentType';
import TotalInputs from '../util/TotalInputs';
import validatedGeneralServices from '../../utils/Validations/validatedGeneralServices';
import {RenderErrorMessage, AlertSuccess} from '../util/Alerts';


class GeneralServicesForm extends Component {
  constructor(props) {
    super(props);
  }

  removeProduct = (id) => {
    this.props.removeProduct(id);
  }
  onchangeLabor = (e) => {
    let labor = e.target.value;
    let newNeto = calculateWithLabor(e.target.value, this.props.generalServices.totalNetoClone);
    if(labor !== '') {
      this.props.pricePlusLabor(labor,newNeto);
    }
    else {
      this.props.pricePlusLabor(labor,newNeto);
      this.props.totalProperty(calculateTotal(this.props.generalServices.products, 0, 0, 0, 0));
    }
  }
  onChangeInput = (e) => {
    this.props.addGeneralProperty({
      property: [e.target.name],
      value: e.target.value
    })
  }
  onChangeProductType = (e) => {
    let productType = e.target.value;
    console.log('get to here ', productType);
    if(productType) {
      this.props.filterProduct(productType);
    }
  }
  onChangeInputCustomer = (e) => {
      this.props.addCustomerProperty({
        property: [e.target.name],
        value: e.target.value
      });
  }
  onProductAdd = () => {
    let general = this.props.generalServices;
    let quantity = general.item_select_quantity;
    if (general.item_select_id !== '' && quantity) {
       let pro = this.props.products.productList.find((item) => {
        if (item._id == general.item_select_id) {
          return item;
        }
       });
      let itebis_tmp = pro.itebis;
      let total_tmp = (parseFloat(pro.price) * parseInt(quantity)).toFixed(2);

      this.props.totalProperty(calculateTotal(general.products, itebis_tmp, parseFloat(pro.price), parseInt(general.item_select_quantity)));

      let findProduct = general.products.find((item)=> {
        if (item.product_id == general.item_select_id) {
          return item;
        }
      });

      if(findProduct) {
        this.props.addExitedProduct({
          product_id: pro._id,
          productType: pro.productType,
          name_: pro.name_,
          price: pro.price,
          quantity: general.item_select_quantity,
          itebis: itebis_tmp,
          totalProduct: total_tmp
        });
      }
      else {
        this.props.addProduct({
          product_id: pro._id,
          productType: pro.productType,
          name_: pro.name_,
          price: pro.price,
          quantity: general.item_select_quantity,
          itebis: itebis_tmp,
          totalProduct: total_tmp
        });
      }
     }
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
        item_select_name: pro.name_,
        item_type_select: pro.typeProduct
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
    if(e.target.value == '') {
      this.props.changeItemQuantity(e.target.value);
    }else {
      let quantity = parseInt(e.target.value);
      if((typeof quantity == "number" && !isNaN(quantity))) {
        this.props.changeItemQuantity(quantity);
      }
    }
  }
  onChangeInputDisc = () => {}
  onSubmit = (e) => {
    e.preventDefault();
    let validatedGeneral = validatedGeneralServices(this.props.generalServices);
    if((this.props.generalServices.customer.rnc !== undefined && this.props.generalServices.customer.rnc !== '') && this.props.generalServices.ncfType === '') {
      validatedGeneral = {...validatedGeneral, nfcType: ["Especifique el tipo de comprobante"]};
    }
    if(validatedGeneral) {
      this.props.addErrors(validationSpread(validatedGeneral));
    }else{
      this.props.saveGeneralServices(this.props.generalServices);
    }
     window.scrollTo(1000, 0);
  }
  componentDidMount() {
    this.props.loadProducts();
  }
  componentWillUnmount() {
     this.props.clearGeneralServices();
  }

  render() {
    let general = this.props.generalServices;
    let products = this.props.products;
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    let hours = today.getHours();
    let minute = today.getMinutes();
    let todayDate = `${dd}/${mm}/${yyyy}  ${hours}:${minute}`;
    ;

    if(general.isRedirect) {
       return <Redirect to='/'/>
    }
    return (
      <div className="container">
      {general.didSaved
          ? <AlertSuccess text={"La factura fue guardado y listo para pasar por caja."}/>
          : null}
       {general.generalServerErrors.length > 0 ?  <RenderErrorMessage errors={general.generalServerErrors}/> : null }

        <form onSubmit={(e)=>this.onSubmit(e)}>
        <input name="id" type="text" className="not-show"/>

        <div className="">
          <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 pull-right">
            <div className="form-group">
              <label className="sr-only"></label>
              <input className="form-control" placeholder="Fecha" name="date" type="text" readOnly value={todayDate}/>
           </div>
         </div>
        <PaymentType
          onChangeInput = {this.onChangeInput}
        />
        </div>
        <fieldset>
          <legend>Ventas generales</legend>
        <CustomerField
           customer={general.customer}
           onChangeInput={this.onChangeInputCustomer}
           onClickNcfType={this.onChangeInput}
          />
        <ProductAndGeneralServicesSelectorGrid
          isGeneralServicesOn = { general.isGeneralServicesOn }
          item_type_select = { general.item_type_select }
          item_select_quantity = { general.item_select_quantity }
          item_select_price = { general.item_select_price}
          item_select_name = { general.item_select_name }
          item_select_id = { general.item_select_id }
          onChangeProductType = { this.onChangeProductType }
          onChangeFind = { this.onChangeItemFind }
          list = { products.productList }
          onClickElementList = {this.onSelectProduct}
          onChangeProductQuantity = {this.onChangeProductQuantity}
          onProductAdd = {  this.onProductAdd }
          productsAdded = {  general.products }
          onClickRemoveOfList = { this.removeProduct }
      />

      <TotalInputs
       totalBruto={general.totalBruto}
       onChangeInputDisc={this.onChangeInputDisc}
       totalDesc={general.totalDesc}
       totalItebis={general.totalItebis}
       totalNeto={general.totalNeto}
       labor={general.labor}
       onChangeLabor={this.onchangeLabor}
      />
</fieldset>
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
  addExitedProduct: (product) => {
    dispatch(generalServicesAction.addExitedProduct(product));
  },
  removeProduct: (id) => {
    dispatch(generalServicesAction.removeProduct(id));
  },
  pricePlusLabor: (labor, neto) => {
    dispatch(generalServicesAction.pricePlusLabor(labor,neto));
  },
  clearGeneralServices: () => {
    dispatch(generalServicesAction.clearGeneralServices());
  },
  addErrors: (errorArray) => {
    dispatch(generalServicesAction.addErrors(errorArray));
  },
  addGeneralProperty: (general) => {
    dispatch(generalServicesAction.addGeneralProperty(general));
  },
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
