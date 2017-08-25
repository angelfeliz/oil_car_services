import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import CustomerField from '../Customers/CustomerField';
import VehicleField from '../Vehicles/VehicleField';
import {GetAllProducts, filteringProduct} from '../../actions/productsAction';
import * as oilChangeServicesAction from '../../actions/oilChangeServicesAction';
import ProductAndGeneralServicesSelectorGrid from '../UtilsServices/ProductAndGeneralServicesSelectorGrid';
import ServicesCheckbox from '../UtilsServices/ServicesCheckBox';
import ModalList from '../util/ModalList';
import * as alerts from '../util/Alerts';
import validatedOilChange from '../../utils/Validations/validatedOilChange';
import { validationSpread, calculateTotal } from '../../utils/functions';



class OilChangeServicesForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product_select_price: '',
      product_select: '',
      product_select_quantity: '',
      product_select_name: 'seleccione producto',
      product_type_select: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeServicsInput = this.onChangeServicsInput.bind(this);
    //this.onProductChangeInput = this.onProductChangeInput.bind(this);
    this.onChangeProductQuantity = this.onChangeProductQuantity.bind(this);
    this.onProductAdd = this.onProductAdd.bind(this);
    this.onChangeFindProduct = this.onChangeFindProduct.bind(this);

    this.OnClickSelectVehicleFromModalList = this.OnClickSelectVehicleFromModalList.bind(this);
    this.onChangeProductType = this.onChangeProductType.bind(this);
    const products = [];
  }

  onChangeProductType(e) {
    let productType = e.target.value;
    if(productType) {
      this.props.filteringProudct(productType);
    }
  }
  onChangeInputCustomer = (e) => {
    this.props.addCustomerServerCustomer({
      property: [e.target.name],
      value: e.target.value
    });
  }

  onChangeInput = (e) => {
    this.props.addGeneralProperty({
      property: [e.target.name],
      value: e.target.value
    });
  }

  onChangeServicsInput(e) {
    if (e.target != undefined) {
      if (e.target.value == 'check') {
        let checkbox = e.target;
        let value = false;
        if (checkbox.checked) {
          value = true;
        }
        this.props.addCustomerServerServices({
          property: [checkbox.name],
          value: value
        });
      }
    }
  }

  onProductAdd() {
    let pro = this.products.find((item) => {
      if (item._id == this.state.product_select) {
        return item;
      }
    });
    let itebis_tmp = parseFloat(pro.price) * 0.18;
    let total_tmp = (parseFloat(pro.price) + parseFloat(itebis_tmp)) * parseInt(this.state.product_select_quantity);
    this.props.totalPropertyDispatch(calculateTotal(this.props.oilChangeServices.products, itebis_tmp, parseFloat(pro.price), parseInt(this.state.product_select_quantity), parseInt(this.state.totalDesc)));

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

  /*This Handle set the produc_select state with the price and the id for future known*/
 onSelectProduct = (_id) => {
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

  onChangeProductQuantity(e) {
    this.setState({
      ...this.state,
      product_select_quantity: e.target.value
    });
  }

  onChangeInputVehicle = (e) => {
    this.props.addCustomerServerVehicle({
      property: [e.target.name],
      value: e.target.value
    });
  }

  onChangeInputDisc = (e) => {
    if (Number.isInteger(parseInt(e.target.value)) && parseInt(e.target.value) > 0 && e.target.value) {
      let total_desc = parseInt(e.target.value);
      let total_bruto = 0;
      let total_itebis = 0;
      let total_neto = 0;
      for (let i = 0; i < this.products.length; i++) {
        total_bruto = (total_bruto + (parseFloat(this.products[i].price) * parseInt(this.products[i].quantity)));
      }
      total_bruto = (total_bruto - total_desc);
      total_itebis = total_bruto * 0.18;
      total_neto = total_bruto + total_itebis;

      //Redux state
      total_bruto = parseFloat(Math.round(total_bruto * 100) / 100).toFixed(2);
      total_neto = parseFloat(Math.round(total_neto * 100) / 100).toFixed(2);
      total_itebis = parseFloat(Math.round(total_itebis * 100) / 100).toFixed(2);
      this.props.totalPropertyDispatch({
        totalBruto: total_bruto,
        totalNeto: total_neto,
        totalItebis: total_itebis,
        totalDesc: total_desc });
    } else if (Number.isInteger(parseInt(e.target.value)) && parseInt(e.target.value) === 0) {
      this.props.totalPropertyDispatch(calculateTotal(this.props.oilChangeServices.products));
    } else if (!e.target.value) {
      this.props.totalPropertyDispatch(calculateTotal(this.props.oilChangeServices.products));
    } else {
      //Redux state
      this.props.totalPropertyDispatch(
        {
           totalBruto: this.props.oilChangeServices.totalBruto,
           totalNeto: this.props.oilChangeServices.totalNeto,
           totalItebis: this.props.oilChangeServices.totalItebis,
           totalDesc: this.props.oilChangeServices.totalDesc
         });
    }
  }
  OnClickSelectVehicleFromModalList(id) {
    let vehicleChose = this.props.oilChangeServices.vehicleArray.find((item) => {
      if(item._id == id){
        return item;
      }
    })
    if(vehicleChose) {
      this.props.stageVehicle(vehicleChose);
      this.props.toggleModalListVehichle();
    }
   }
  onSubmit() {
    console.log('Entro a submit');
    let validation = validatedOilChange(this.props.oilChangeServices);
    console.log(validation);
    if(validation === undefined) {
      this.props.saveCustomerServices(this.props.oilChangeServices);
    }
    else {
      this.props.addOilChangeErrors(validationSpread(validation));
    }
    window.scrollTo(1000,0);
  }

  componentDidMount() {
    if(this.props.match.params.id){
      let customer_id = this.props.match.params.id;
      this.props.getCustomerById(customer_id);
    }
    this.props.loadProducts();
  }

  render() {
    this.products = this.props.products.productList.map((item) => {
      return item
    });
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    let todayDate = `${dd}/${mm}/${yyyy}`;


    return this.props.oilChangeServices.doneAndRedirect
      ? <Redirect to="/"/>
      : (
        <div className={1==1
          ? " container"
          : "container"}>
          {this.props.oilChangeServices.didSaved ? <alerts.AlertSuccess text={"El cambio de aceite fue guardado y listo para pasar por caja."}/> : null}
          {this.props.oilChangeServices.isModalListVehicle
            ? <ModalList
              vehicleArray={this.props.oilChangeServices.vehicleArray}
              OnClickSelect={this.OnClickSelectVehicleFromModalList}
            /> : null}
            <div className={this.props.oilChangeServices.oilChangeErrors.length > 0
              ? 'showElement'
              : 'hideElement'}>
              {alerts.RenderErrorMessage(this.props.oilChangeServices.oilChangeErrors)}
            </div>
          <form method="post" onSubmit={e => {
            e.preventDefault();
            this.onSubmit();
          }}>
            <input name="id" type="text" className="not-show"/>
            <div className="row">
              <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 pull-right">
                <div className="form-group">
                  <label className="sr-only"></label>
                  <input className="form-control" placeholder="Fecha" name="date" type="text" readOnly value={todayDate}/>
               </div>
            </div>
            <fieldset>
              <legend>Forma de pago</legend>
              <div className="col-xs-4 col-sm-3 col-md-2 col-lg-2">
                <div className="form-group">
                  <label className="sr-only"></label>
                  <input onChange={(e) => this.onChangeInput(e)} className="" type="radio" name="typePayment" value="cash" /><span>Contado</span>
                </div>
              </div>
              <div className="col-xs-4 col-sm- col-md-2 col-lg-2">
                <div className="form-group">
                  <label className="sr-only"></label>
                  <input onChange={(e) => this.onChangeInput(e)} className="" type="radio" name="typePayment" value="credit" /><span>Credito</span>
                </div>
              </div>
              </fieldset>
            </div>
            <div className="row">
            <fieldset>
               <legend>Cambio de aceite</legend>
               <CustomerField
                   customer={this.props.oilChangeServices.customer}
                   onChangeInput={this.onChangeInputCustomer}
               />
               <div className="row">
               <div className="col-sm-3 col-md-1 col-lg-1 pull-left">
                 <button onClick={() => this.props.toggleModalListVehichle()} type="button"><i className="fa fa-wrench" aria-hidden="true"></i></button>
               </div>
               </div>

               <VehicleField
                 brand={ this.props.oilChangeServices.vehicle.brand }
                 model={ this.props.oilChangeServices.vehicle.model }
                 year={ this.props.oilChangeServices.vehicle.year }
                 numberPlace={ this.props.oilChangeServices.vehicle.numberPlace }
                 typeFuel={ this.props.oilChangeServices.vehicle.typeFuel }
                 km={this.props.oilChangeServices.vehicle.km}
                 nextKm={this.props.oilChangeServices.vehicle.nextKm}
                 onChange={ this.onChangeInputVehicle } />

               <div className="row">
                 <div className="col-sm-4 col-md-4">
                   <div className="form-group">
                     <label className="sr-only"></label>
                     <input onChange={(e) => this.onChangeInput(e)} className="form-control" placeholder="Supervisor" name="supervisor" type="text"/>
                   </div>
                 </div>
                 <div className="col-sm-4 col-md-4">
                   <div className="form-group">
                     <label className="sr-only"></label>
                     <input onChange={(e) => this.onChangeInput(e)} className="form-control" placeholder="Mecanico" name="mechanic" type="text"/>
                   </div>
                 </div>
                 <div className="col-sm-4 col-md-4">
                   <div className="form-group">
                     <label className="">Proximo cambió</label>
                     <input onChange={(e) => this.onChangeInput(e)} className="form-control" placeholder="Date" name="dateNextOilChange"  type="date"/>
                   </div>
                 </div>
               </div>

               <ServicesCheckbox onChange={this.onChangeServicsInput}/>
               <ProductAndGeneralServicesSelectorGrid
                 onProductAdd={this.onProductAdd}
                 onChangeProductQuantity={this.onChangeProductQuantity}
                 onChangeFind={this.onChangeFindProduct}
                 onChangeProductType={this.onChangeProductType}
                 list={this.products}
                 onClickElementList = {this.onSelectProduct}
                 productsAdded={this.props.oilChangeServices.products}
                 item_select_price={this.state.product_select_price}
                 item_select_name={this.state.product_select_name}
                 item_select_quantity = { this.state.product_select_quantity}
                 product_type_select = { this.state.product_type_select }/>

               <div className="row top-money">
                 <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 pull-right">
                   <div className="form-group">
                     <label className="sr-only"></label>
                     <input className="form-control" placeholder="Total bruto" name="total_bruto" type="text" value={this.props.oilChangeServices.totalBruto} readOnly/>
                   </div>
                 </div>
               </div>

               <div className="row">
                 <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 pull-right">
                   <div className="form-group">
                     <label className="sr-only"></label>
                     <span className="input-group">
                       <span className="input-group-addon">$</span><input onChange={(e) => this.onChangeInputDisc(e)} className="form-control" placeholder="desc" name="percent_disc" type="text" value={this.props.oilChangeServices.totalDesc}/>
                     </span>
                   </div>
                 </div>
               </div>

               <div className="row">
                 <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 pull-right">
                   <div className="form-group">
                     <label className="sr-only"></label>
                     <input className="form-control" placeholder="itebis" name="ptotal_itebis" type="text" value={this.props.oilChangeServices.totalItebis} readOnly/>
                   </div>
                 </div>
               </div>

               <div className="row">
                 <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 pull-right">
                   <div className="form-group">
                     <label className="sr-only"></label>
                     <input className="form-control" placeholder="total neto" name="total_neto" type="text" value={this.props.oilChangeServices.totalNeto} readOnly/>
                   </div>
                 </div>
               </div>
            </fieldset>
          </div>
         <button className="btn btn-primary" type="submit">Guardar</button>
          </form>
        </div>
      );
  }
}

const mapStateToProps = (state) => ({
    oilChangeServices: state.oilChangeServices,
    //customers: state.customers,
    products: state.products,
    vehicles: state.vehicles,
})

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () => {
      dispatch(GetAllProducts());
    },
    saveCustomerServices: (state) => {
      dispatch(oilChangeServicesAction.postCustomerServiceForm(state));
    },
    filteringProudct: (filter) => {
      dispatch(filteringProduct(filter));
    },
    totalPropertyDispatch: (totals) => {
      console.log('totals', totals);
      dispatch(oilChangeServicesAction.generalTotalProperty(totals));
    },
    addCustomerServerCustomer: (customer) => {
      dispatch(oilChangeServicesAction.addCustomerServerCustomer(customer));
    },
    addCustomerServerVehicle: (vehicle) => {
      dispatch(oilChangeServicesAction.addCustomerServerVehicle(vehicle));
    },
    addGeneralProperty: (general) => {
      dispatch(oilChangeServicesAction.addGeneralProperty(general));
    },
    addCustomerServerServices: (services) => {
      dispatch(oilChangeServicesAction.addCustomerServerServices(services));
    },
    addCustomerServerProduct: (product) => {
      dispatch(oilChangeServicesAction.addCustomerServerProduct(product));
    },
    getCustomerById: (customer_id) => {
      dispatch(oilChangeServicesAction.getCustomerById(customer_id));
    },
    stageVehicle: (vehicle) => {
      dispatch(oilChangeServicesAction.stageVehicle(vehicle));
    },
    toggleModalListVehichle: () => {
      dispatch(oilChangeServicesAction.toggleModalListVehicle());
    },
    addOilChangeErrors: (errors) => {
      dispatch(oilChangeServicesAction.addOilChangeErrors(errors));
    }
  }
}

const OilChangeServices = withRouter(connect(mapStateToProps, mapDispatchToProps)(OilChangeServicesForm));

export default OilChangeServices
