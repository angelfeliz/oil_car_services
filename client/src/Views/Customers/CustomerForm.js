import React,  { Component } from 'react';
import { connect } from 'react-redux';
import validateCustomer from '../../utils/Validations/validateCustomer';
import CustomerField from './CustomerField';
import * as customerAction from '../../actions/customerAction';
import * as alerts from '../util/Alerts';

class CustomerForm extends Component {
  constructor(props) {
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeInput(e) {
    if (e.target.value != undefined) {
      this.props.addCustomerItem({
        property: [e.target.name],
        value: e.target.value
      });
    }
  }
componentWillUnmount() {
  this.props.cleanCustomerStateUnMounte();
}
  onSubmit(e) {
    e.preventDefault();
    let validation = validateCustomer(this.props.customers.customer);
    if (validation == undefined) {
      if(this.props.customers.customer.createdAt) {
        this.props.updateCustomer(this.props.customers.customer);
      }
      else {
        this.props.saveCustomer(this.props.customers.customer);
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
      this.props.addCustomerErrors(errorList);
    }
  }



render() {
  return(
<div className="container">
{ this.props.customers.didSaved  ? <alerts.AlertSuccess text={"guardado con exito!"} />
  : null}

    <button className={this.props.customers.isShowCustomerForm
      ? 'hideElement'
      : 'showElement btn btn-primary pull-right'} onClick={() => {
      this.props.showCustomerForm();
    }}>
      Agregar Cliente
    </button>

    <div className={this.props.customers.errors.length > 0
      ? 'showElement'
      : 'hideElement'}>
      { alerts.RenderErrorMessage(this.props.customers.errors) }
    </div>
    <div>
    <form method="post" className={this.props.customers.isShowCustomerForm
      ? 'showElement'
      : 'hideElement'} onSubmit={e => { this.onSubmit(e) }}>
      <CustomerField
          firstName={this.props.customers.customer.firstName}
          lastName={this.props.customers.customer.lastName}
          rnc={this.props.customers.customer.rnc}
          phoneNumber={this.props.customers.customer.phoneNumber}
          email={this.props.customers.customer.email}
          onChangeInput={this.onChangeInput}
      />
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
    </div>
    </div>
  )
 }
}

const mapStateToProps = (state) => {
  return {customers: state.customers}
}

const mapStateToDispatch = (dispatch) => {
  return {
    saveCustomer: (stateForm) => {
      dispatch(customerAction.saveCustomer(stateForm));
    },
    cleanCustomerStateUnMounte() {
      dispatch(customerAction.cleanCustomerStateDefault());
    },
    showCustomerForm: () => {
      dispatch(customerAction.showCustomerForm());
    },
    addCustomerErrors: (errorList) => {
      dispatch(customerAction.addCustomerErrors(errorList));
    },
    addCustomerItem: (customer) => {
      dispatch(customerAction.addCustomerItem(customer));
    },
    updateCustomer: (customer) => {
      dispatch(customerAction.updateCustomer(customer));
    }
  }
}

CustomerForm = connect(mapStateToProps, mapStateToDispatch)(CustomerForm);

export default CustomerForm
