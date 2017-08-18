import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import CustomerField from './Customers/CustomerField';
import VehicleField from './Vehicles/VehicleField';
import {GetAllProducts, filteringProduct} from '../actions/productsAction';
import * as customerServicesAction from '../actions/customerServicesAction';
import Services, {ServicesCheckbox} from './CustomerServerServices';
import ModalList from './util/ModalList';
import * as alerts from './util/Alerts';


class CustomerServiceForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product_select_price: '',
      product_select: '',
      product_select_cuantity: '',
      product_select_name: 'seleccione producto'
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeServicsInput = this.onChangeServicsInput.bind(this);
    this.onProductChangeInput = this.onProductChangeInput.bind(this);
    this.onChangeProductCuantaty = this.onChangeProductCuantaty.bind(this);
    this.onProductAdd = this.onProductAdd.bind(this);
    this.onChangeFindProduct = this.onChangeFindProduct.bind(this);
    this.onChangeInputCustomer = this.onChangeInputCustomer.bind(this);
    this.CalculateTotal = this.CalculateTotal.bind(this);
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
  onChangeInputCustomer(e) {
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
    let total_tmp = (parseFloat(pro.price) + parseFloat(itebis_tmp)) * parseInt(this.state.product_select_cuantity);
    this.CalculateTotal(itebis_tmp, parseFloat(pro.price), parseInt(this.state.product_select_cuantity), parseInt(this.state.totalDesc));

    this.props.addCustomerServerProduct({
      product_id: pro._id,
      typeProduct: pro.typeProduct,
      name_: pro.name_,
      price: pro.price,
      cuantity: this.state.product_select_cuantity,
      itebis: itebis_tmp,
      totalProduct: total_tmp
    });
  }

  /*This Handle set the produc_select state with the price and the id for future known*/
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

  CalculateTotal(total_itebis_tmp = 0, total_bruto_tmp = 0, cantidad = 0) {
    let total_bruto = total_bruto_tmp * cantidad;
    let total_itebis = total_itebis_tmp * cantidad;
    let total_neto = total_bruto + total_itebis;

    for (let i = 0; i < this.props.state.customerServer.products.length; i++) {
      let product = this.props.state.customerServer.products[i];
      total_bruto = (total_bruto + (parseFloat(product.price) * parseInt(product.cuantity)));
      total_itebis = total_itebis + (parseFloat(product.itebis) * parseInt(product.cuantity));
      total_neto = total_bruto + total_itebis;
    }
    //State Redux
    total_bruto = parseFloat(Math.round(total_bruto * 100) / 100).toFixed(2);
    total_neto = parseFloat(Math.round(total_neto * 100) / 100).toFixed(2);
    total_itebis = parseFloat(Math.round(total_itebis * 100) / 100).toFixed(2);
    this.props.totalPropertyDispatch(total_bruto, total_neto, total_itebis, 0);
  }

  onChangeProductCuantaty(e) {
    this.setState({
      ...this.state,
      product_select_cuantity: e.target.value
    });
  }

  onChangeInputVehicle = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
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
      for (let i = 0; i < this.state.products.length; i++) {
        total_bruto = (total_bruto + (parseFloat(this.state.products[i].price) * parseInt(this.state.products[i].cuantity)));
      }
      total_bruto = (total_bruto - total_desc);
      total_itebis = total_bruto * 0.18;
      total_neto = total_bruto + total_itebis;

      //Redux state
      total_bruto = parseFloat(Math.round(total_bruto * 100) / 100).toFixed(2);
      total_neto = parseFloat(Math.round(total_neto * 100) / 100).toFixed(2);
      total_itebis = parseFloat(Math.round(total_itebis * 100) / 100).toFixed(2);
      this.props.totalPropertyDispatch(total_bruto, total_neto, total_itebis, total_desc);
    } else if (Number.isInteger(parseInt(e.target.value)) && parseInt(e.target.value) === 0) {
      this.CalculateTotal();
    } else if (!e.target.value) {
      this.CalculateTotal();
    } else {
      //Redux state
      this.props.totalPropertyDispatch(this.props.state.customerServer.totalBruto, this.props.state.customerServer.totalNeto, this.props.state.customerServer.totalItebis, this.props.state.customerServer.totalDesc);
    }
  }
  OnClickSelectVehicleFromModalList(id) {
    let vehicleChose = this.props.state.customerServer.vehicleArray.find((item) => {
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
    //console.log('redux', this.props.state.customerServer);
    this.props.saveCustomerServices(this.props.state.customerServer);
  }

  componentDidMount() {
    if(this.props.match.params.id){
      let customer_id = this.props.match.params.id;
      this.props.getCustomerById(customer_id);
    }
    this.props.loadProducts();
  }

  render() {
    this.products = this.props.state.products.productList.map((item) => {
      return item
    });

    return this.props.state.customerServer.doneAndRedirect
      ? <Redirect to="/"/>
      : (
        <div className={this.props.state.posts.isFetching
          ? " container"
          : "container"}>
          {this.props.state.customerServer.didSaved ? <alerts.AlertSuccess text={"El cambio de aceite fue guardado y listo para pasar por caja."}/> : null}
          {this.props.state.customerServer.isModalListVehicle
            ? <ModalList
              vehicleArray={this.props.state.customerServer.vehicleArray}
              OnClickSelect={this.OnClickSelectVehicleFromModalList}
            /> : null}
          <form method="post" onSubmit={e => {
            e.preventDefault();
            this.onSubmit();
          }}>
            <input name="id" type="text" className="not-show"/>
            <div className="row">
              <div className="col-sm-3 col-md-3 col-lg-3 pull-right">
                <div className="form-group">
                  <label className="sr-only"></label>
                  <input className="form-control" placeholder="Fecha" name="date" type="text"/>
                </div>
              </div>
            </div>
            <CustomerField
                firstName={this.props.state.customerServer.customer.firstName}
                lastName={this.props.state.customerServer.customer.lastName}
                rnc={this.props.state.customerServer.customer.rnc}
                phoneNumber={this.props.state.customerServer.customer.phoneNumber}
                email={this.props.state.customerServer.customer.email}
                onChangeInput={this.onChangeInputCustomer}
            />
            <div className="row">
            <div className="col-sm-3 col-md-1 col-lg-1 pull-left">
              <button onClick={() => this.props.toggleModalListVehichle()} type="button"><i className="fa fa-wrench" aria-hidden="true"></i></button>
            </div>
            </div>

            <VehicleField
              brand={ this.props.state.customerServer.vehicle.brand }
              model={ this.props.state.customerServer.vehicle.model }
              year={ this.props.state.customerServer.vehicle.year }
              numberPlace={ this.props.state.customerServer.vehicle.numberPlace }
              typeFuel={ this.props.state.customerServer.vehicle.typeFuel }
              km={this.props.state.customerServer.vehicle.km}
              nextKm={this.props.state.customerServer.vehicle.nextKm}
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
            </div>

            <ServicesCheckbox onChange={this.onChangeServicsInput}/>
            <Services
              onChangeProduct={this.onProductChangeInput}
              onProductAdd={this.onProductAdd}
              onChangeProductCuantaty={this.onChangeProductCuantaty}
              onChangeFindProduct={this.onChangeFindProduct}
              products={this.products}
              productsAdded={this.props.state.customerServer.products}
              product_select_price={this.state.product_select_price}
              product_select_name={this.state.product_select_name}/>

            <div className="row top-money">
              <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 pull-right">
                <div className="form-group">
                  <label className="sr-only"></label>
                  <input className="form-control" placeholder="Total bruto" name="total_bruto" type="text" value={this.props.state.customerServer.totalBruto} readOnly/>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 pull-right">
                <div className="form-group">
                  <label className="sr-only"></label>
                  <span className="input-group">
                    <span className="input-group-addon">$</span><input onChange={(e) => this.onChangeInputDisc(e)} className="form-control" placeholder="desc" name="percent_disc" type="text" value={this.props.state.customerServer.totalDesc}/>
                  </span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 pull-right">
                <div className="form-group">
                  <label className="sr-only"></label>
                  <input className="form-control" placeholder="itebis" name="ptotal_itebis" type="text" value={this.props.state.customerServer.totalItebis} readOnly/>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 pull-right">
                <div className="form-group">
                  <label className="sr-only"></label>
                  <input className="form-control" placeholder="total neto" name="total_neto" type="text" value={this.props.state.customerServer.totalNeto} readOnly/>
                </div>
              </div>
            </div>
            {this.props.state.posts.isFetching
              ? <button className="btn btn-primary" type="submit" disabled>
                  Guardar</button>
              : <button className="btn btn-primary" type="submit">
                Guardar</button>}
          </form>
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {state: state}
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () => {
      dispatch(GetAllProducts());
    },
    saveCustomerServices: (state) => {
      dispatch(customerServicesAction.postCustomerServiceForm(state));
    },
    filteringProudct: (filter) => {
      dispatch(filteringProduct(filter));
    },
    totalPropertyDispatch: (totalBruto, totalNeto, totalItebis) => {
      dispatch(customerServicesAction.generalTotalProperty(totalBruto, totalNeto, totalItebis));
    },
    addCustomerServerCustomer: (customer) => {
      dispatch(customerServicesAction.addCustomerServerCustomer(customer));
    },
    addCustomerServerVehicle: (vehicle) => {
      dispatch(customerServicesAction.addCustomerServerVehicle(vehicle));
    },
    addGeneralProperty: (general) => {
      dispatch(customerServicesAction.addGeneralProperty(general));
    },
    addCustomerServerServices: (services) => {
      dispatch(customerServicesAction.addCustomerServerServices(services));
    },
    addCustomerServerProduct: (product) => {
      dispatch(customerServicesAction.addCustomerServerProduct(product));
    },
    getCustomerById: (customer_id) => {
      dispatch(customerServicesAction.getCustomerById(customer_id));
    },
    stageVehicle: (vehicle) => {
      dispatch(customerServicesAction.stageVehicle(vehicle));
    },
    toggleModalListVehichle: () => {
      dispatch(customerServicesAction.toggleModalListVehicle());
    }
  }
}

const CustomerServices = withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerServiceForm));

export default CustomerServices
