import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import * as vehicleAction from '../../actions/vehicleAction';
import VehicleItemList from './VehicleItemList';
import BoxModel from '../util/BoxModel';
import * as customerAction from '../../actions/customerAction';

class Vehicles extends Component{
  constructor(props){
    super(props);
    this.onClickEditdVehicle = this.onClickEditdVehicle.bind(this);
  }

  onClickEditdVehicle(_id) {
    
   let vehicle = this.props.vehicles.vehicleArray.find(((item) => {
     if(item._id === _id){
       return item;
     }
   }));

   let customer = this.props.customers.customerList.find((item) => {
        if(item._id === vehicle.customer_id) {
           return item;
        }
   });
   console.log('check cus', customer);
   vehicle = { ...vehicle, selectOwner: customer.firstName + ' ' + customer.lastName };
   this.props.stageWorkVehicle(vehicle);
   this.props.showVehicleForm();
  }

  onChangeFilterVehicle = (e) => {
    if (e.target.value != undefined && e.target.value) {
      this.props.filteringVehicle(e.target.value);
    } else {
      this.props.loadVehicles();
    }
  }

  componentDidMount(){
    this.props.loadVehicles();
    this.props.loadCustomers();
   }

  render() {
      const vehicles = this.props.vehicles.vehicleArray;

      if(vehicles.length == 0 && !this.props.vehicles.isNoMatch) {
        return <div className="text-center"><h2>Lista de vehicles está vacía</h2></div>
      }
       return( <div className="container">
       <h2 className="text-center">Vehicle</h2>
       <div className="row">
         <div className="col-lg-6 col-md-6 col-sm-12 col-xm-12">
           <div className="form-group">
             <label className="sr-only"></label>
             <input placeholder="Buscar..." className="form-control" type="text" onChange={(e) => this.onChangeFilterVehicle(e)}/>
           </div>
         </div>
       </div>
       <div className="product-grid">
       { vehicles.map((item, index) => {
           return( <div key={index}>
                   <VehicleItemList
                     vehicle = {item}
                     index = {index}
                     onClickEditdVehicle = {this.onClickEditdVehicle}
                  />
               </div>)
       })}
       </div>
       </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    vehicles: state.vehicles,
    customers: state.customers,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
         loadVehicles: () => {
           dispatch(vehicleAction.getVehicles());
         },
         loadCustomers: () => {
           dispatch(customerAction.getCutomers());
         },
         stageWorkVehicle: (vehicle) => {
           dispatch(vehicleAction.stageVehicle(vehicle));
         },
         resetStageVehicle: () => {
           dispatch(vehicleAction.resetStageVehicle())
         },
         showVehicleForm: () => {
           dispatch(vehicleAction.toggleVehicleForm());
         },
         filteringVehicle: (filter) => {
           dispatch(vehicleAction.filterVehicle(filter));
         }
  }
}

 const VehicleList = withRouter(connect(
   mapStateToProps,
   mapDispatchToProps
 )(Vehicles));

export default VehicleList;
