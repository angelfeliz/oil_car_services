import React, {Component} from 'react';
import {connect} from 'react-redux';
import api from '../../api';
import * as vehicleAction from '../../actions/vehicleAction';
import * as customerAction from '../../actions/customerAction';
import validateVehicle from '../../utils/Validations/validatedVehicle';
import * as alerts from '../util/Alerts';
import HeadAutoComplete from '../util/HeadAutoComplete';
import VehicleField from './VehicleField';

class VehicleForm extends Component {
  constructor(props) {
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeInput(e) {
    if (e.target.value != undefined) {
      this.props.addVehicleItem({
        property: [e.target.name],
        value: e.target.value
      });
    }
  }

  onClickElementList = (id) => {
    this.props.addVehicleItem({property: "customer_id", value: id});
    let customer = this.props.customers.customerList.find((item) => {
      if(item._id == id) {
        return item;
      }
    });

    let fullName = customer.firstName + ' ' + customer.lastName;
    this.props.addOwnerItem({property: "selectOwner", value: fullName});

  }

  onChangeFilterCustomer = (e) => {
    if (e.target.value != undefined && e.target.value) {
      this.props.filteringCustomerArray(e.target.value);
    } else {
      this.props.loadCustomers();
    }
  }
  componentWillMount() {
    this.props.loadCustomers();
  }

  componentWillUnmount() {
    console.log('entro disque');
    this.props.cleanVehicleStateUnMount();
  }
  onSubmit(e) {
    e.preventDefault();
    let validation = validateVehicle(this.props.vehicles.vehicle);
    if (validation == undefined) {
      if(this.props.vehicles.vehicle.createdAt) {
        this.props.updateVehicle(this.props.vehicles.vehicle);
      }
      else {
        this.props.saveVehicle(this.props.vehicles.vehicle);
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
      this.props.addVehicleErrors(errorList);
    }
  }

  render() {

    return (
      <div className="container">
        {this.props.vehicles.didSaved
          ? <alerts.AlertSuccess text={"El vehiculo fue guardado sastifactoriamente"} />
          : null}
        <button className={this.props.vehicles.isShowVehicleForm
          ? 'hideElement'
          : 'showElement btn btn-primary pull-right'} onClick={() => {
          this.props.toggleVehicleForm();
        }}>
          Agregar vehiculo
        </button>
        <div className={this.props.vehicles.vehicleErrors.length > 0
          ? 'showElement'
          : 'hideElement'}>
          {alerts.RenderErrorMessage(this.props.vehicles.vehicleErrors)}
        </div>
        <form method="post" className={this.props.vehicles.isShowVehicleForm
          ? 'showElement'
          : 'hideElement'} onSubmit={e => { this.onSubmit(e) }}>
          <h2>Nuevo vehiculo</h2>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="form-group">
              <HeadAutoComplete
                select_item={ this.props.vehicles.selectOwner }
                onChangeFind = { this.onChangeFilterCustomer }
                list = { this.props.customers.customerList.map((item) => {return {_id: item._id, name_: item.firstName + ' ' + item.lastName};}) }
                onClickElementList= { this.onClickElementList }
              />
              </div>
            </div>
          </div>
          <VehicleField
          onChange = {this.onChangeInput}
          brand= { this.props.vehicles.vehicle.brand}
          model = { this.props.vehicles.vehicle.model }
          year = { this.props.vehicles.vehicle.year}
          numberPlace = {this.props.vehicles.vehicle.numberPlace}
          typeFuel = {this.props.vehicles.vehicle.typeFuel}
          km = {this.props.vehicles.vehicle.km}
          nextKm = {this.props.vehicles.vehicle.nextKm}
          />
          <button type="submit" className="btn btn-success pull-right">Guardar</button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    vehicles: state.vehicles,
    customers: state.customers,
  }
}

const mapStateToDispatch = (dispatch) => {
  return {
    loadCustomers: () => {
      dispatch(customerAction.getCutomers());
    },
    cleanVehicleStateUnMount() {
      dispatch(vehicleAction.cleanVehicleStateDefault())
    },
    filteringCustomerArray: (filter) => {
      dispatch(customerAction.filterCustomer(filter));
    },
    saveVehicle: (vehicle) => {
      dispatch(vehicleAction.saveVehicle(vehicle));
    },
    showVehicleForm: () => {
      dispatch(vehicleAction.toggleVehicleForm());
    },
    addVehicleErrors: (errorList) => {
      dispatch(vehicleAction.addVehicleErrors(errorList));
    },
    addVehicleItem: (product) => {
      dispatch(vehicleAction.addVehicleItem(product));
    },
    updateVehicle: (product) => {
      dispatch(vehicleAction.updateVehicle(product));
    },
    toggleVehicleForm: () => {
      dispatch(vehicleAction.toggleVehicleForm());
    },
    addOwnerItem: (owner) => {
      dispatch(vehicleAction.addOwnerItem(owner));
    }
  }
}

VehicleForm = connect(mapStateToProps, mapStateToDispatch)(VehicleForm);

export default VehicleForm
