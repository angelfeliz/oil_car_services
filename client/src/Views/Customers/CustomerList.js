import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import * as customerAction from '../../actions/customerAction';
import CustomerItemList from './CustomerItemList';
import BoxModel from '../util/BoxModel';


class Customers extends Component{
  constructor(props){
    super(props);
    this.onClickEditdCustomer = this.onClickEditdCustomer.bind(this);
    this.onChangeFilterCustomer = this.onChangeFilterCustomer.bind(this);

  }

  onClickEditdCustomer(_id) {
   let customer = this.props.customers.customerList.find(((item) => {
     if(item._id == _id){
       return item;
     }
   }));
   this.props.stageWorkCustomer(customer);
   this.props.setForUpdateCustomer(customer);
  }

  onChangeFilterCustomer(e) {
    if (e.target.value != undefined && e.target.value) {
      this.props.filteringCustomer(e.target.value);
    } else {
      this.props.loadCustomers();
    }
  }

  componentDidMount(){
    this.props.loadCustomers();
   }

  render() {
      const customers = this.props.customers.customerList;

      if(customers.length == 0 && !this.props.customers.noMachFilter) {
        return <div className="text-center"><h2>Lista de clientes esta vacía</h2></div>
      }

       return( <div className="container">
       <h2 className="text-center">Clientes</h2>
       <div className="row">
         <div className="col-lg-6 col-md-6 col-sm-12 col-xm-12">
           <div className="form-group">
             <label className="sr-only"></label>
             <input placeholder="Buscar..." className="form-control" type="text" onChange={(e) => this.onChangeFilterCustomer(e)}/>
           </div>
         </div>
       </div>

         <div className="product-grid">
         { customers.map((item, index) => {
             return( <div key={index}>
                     <CustomerItemList
                       customer = {item}
                       index = {index}
                       onClickEditdCustomer = {this.onClickEditdCustomer}
                    />
                 </div>)
         })}
         </div>
       </div>
     )
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.customers,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
         loadCustomers: () => {
           dispatch(customerAction.getCutomers());
         },
         filteringCustomer: (filter) => {
           dispatch(customerAction.filterCustomer(filter));
         },
         stageWorkCustomer: (customer) => {
           dispatch(customerAction.stageCustomer(customer));
         },
         resetStageCustomer: () => {
           dispatch(customerAction.resetStageCustomer())
         },
         showCustomerForm: () => {
           dispatch(customerAction.showCustomerForm());
         },
         setForUpdateCustomer: (createdAt) => {
           dispatch(customerAction.setForUpdateCustomer(createdAt));
         }
  }
}

 const CustomerList = withRouter(connect(
   mapStateToProps,
   mapDispatchToProps
 )(Customers));

export default CustomerList;
