import React, { Component } from 'react';
import AutoCompleteList from './util/AutoCompleteDropBox';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import * as customerAction from '../actions/customerAction';
import * as dashBoardAction from '../actions/dashBoardAction';
import * as vehicleAction from '../actions/vehicleAction';


class DashBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      showCustomerAutoList: false,
      redirectToCustomer: false,
      customer_id: '',
      customerSelect: '',
      focusCustomerSearch: false,
    }
    this.customerListCustome = [];
    this.onClickCustomerInput = this.onClickCustomerInput.bind(this);
    this.onClickSelectCustomer = this.onClickSelectCustomer.bind(this);
    this.onClickGoCustomer = this.onClickGoCustomer.bind(this);
    this.onChangeFilterInputCustomer = this.onChangeFilterInputCustomer.bind(this);

  }

  onClickCustomerInput() {
    this.setState({...this.state, showCustomerAutoList: !this.state.showCustomerAutoList, focusCustomerSearch: !this.state.focusCustomerSearch });
  }

  onClickSelectCustomer(_id) {
    let customer = this.customerListCustome.find((item) => {
      if (item._id == _id) {
        return item;
      }
    });
    this.setState({ ...this.state, customer_id: customer._id, showCustomerAutoList: !this.state.showCustomerAutoList, customerSelect: customer.name_ });
  }

  onClickGoCustomer() {
    this.setState({ ...this.state, redirectToCustomer: true });
  }

  onChangeFilterInputCustomer(e) {
    if(e.target.value) {
      let filter = e.target.value;
      this.props.filterListOfCustomer(filter);

      if(this.props.customers.customerList.length <= 0) {
           this.props.filterListOfVehicle(filter);
       }
    }
    else{
      this.props.loadListOfCustomer();
      this.props.loadListOfVehicles();
    }
  }

  componentWillMount() {
    this.props.TopTenOilSellDay();
    this.props.SellOfDayCount();
    this.props.TopAttendedCustomer();
    this.props.CountOilSellDay();
    this.props.loadListOfCustomer();
    this.props.loadListOfVehicles();
   }

  componentWillReceiveProps(nextProps) {
    if(nextProps.vehicles.vehicleArray.length == 1 && !nextProps.customers.isFilterVehicle) {
      let customer_id = this.props.vehicles.vehicleArray[0].customer_id;
      this.props.filterCustomerById(customer_id);
    }
   }

  render() {
      //Creatin custome customer array
      this.customerListCustome = this.props.customers.customerList.map((item) => {
        let name_ = item.firstName +' '+ item.lastName;
        return {
          _id: item._id,
          name_
        }
      });

      if(this.state.redirectToCustomer) {
        return <Redirect to={`/cambioAceiteCliente/${this.state.customer_id}`} />
      }
      else{
        return(
<div className="container">
                 <div className="row">
  <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3 bg-primary card-dashboard">
    <span className="card-info-primary">{this.props.dashBoard.daySellCount}</span><span className="card-icon pull-right gray-light fa fa-user fa-5x" aria-hidden="true"></span>
    <p>Ventas del dia</p>
  </div>
  <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 col-sm-offset-1 col-md-offset-1 col-lg-offset-1 bg-primary card-dashboard">
    <span className="card-info-primary">{this.props.dashBoard.countOilSellDay}</span><span className="card-icon pull-right gray-light fa fa-eyedropper fa-5x" aria-hidden="true"></span>
    <p>Ventas de aceites</p>
  </div>
  <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 col-sm-offset-1 col-md-offset-1 col-lg-offset-1 bg-primary card-dashboard">
    <span className="card-info-primary">-</span><span className="card-icon pull-right gray-light fa fa-refresh fa-5x" aria-hidden="true"></span>
    <p>Empty</p>
  </div>
</div>
<div className="row">
  <div className="padding-left-off col-lg-6">
    <h2 className="padding-left-on bg-primary">Clientes atendidos</h2>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Nombre completo</th>
          <th>Servicio</th>
        </tr>
      </thead>
      <tbody>
      {this.props.dashBoard.topAttendedCustomerArray.map((item, index) => {
          if(item.customer){
            return(
             <tr key={index}>
               <td>{ item.customer.firstName + " " + item.customer.lastName }</td>
               <td>{ "Cambio de aceite" }</td>
             </tr>)
        }
      })}
      </tbody>
    </table>
  </div>
   <div className="col-lg-offset-1 col-lg-5">
      <form className="dash_board-margin-form">
        <div className="form-group">
          <div className="input-group">
            <input className="form-control" placeholder="Busca cliente"  onClick={this.onClickCustomerInput} value={this.state.customerSelect}/>
            <span className="go_arrow input-group-addon" onClick={this.onClickGoCustomer}><i className="fa fa-arrow-right" aria-hidden="true"></i></span>
          </div>
           { this.state.showCustomerAutoList ?
             (<div>
               <input className="form-control" type="text" placeholder="Escriba el nombre del cliente"
                //onBlur={this.onClickCustomerInput}
                 autoFocus= { this.state.focusCustomerSearch }
                 onChange={ (e)=>{this.onChangeFilterInputCustomer(e)} }/>
               <AutoCompleteList
                list= { this.customerListCustome }
                onClick = { this.onClickSelectCustomer }
                />
               </div>): null }
        </div>
      </form>
      <h2 className="padding-left-on bg-primary">Marca mas vendida</h2>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Marca aceite</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
      {this.props.dashBoard.topOilSellArray.map((item, index) => {
        return(
          <tr key={index}>
            <td>{ item._id.product_name }</td>
            <td>{ item.count }</td>
          </tr>
        )
      })}
      </tbody>
    </table>
    </div>
</div>
</div>)
}
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadListOfCustomer: () => {
      dispatch(customerAction.getCutomers());
    },
    filterListOfCustomer: (property, filter) => {
      dispatch(customerAction.filterCustomer(property, filter));
    },
    filterCustomerById: (filter) => {
      dispatch(customerAction.filterCustomerById(filter));
    },
    TopTenOilSellDay: () => {
      dispatch(dashBoardAction.getTopTenOilSellInfoDay());
    },
    SellOfDayCount: () => {
      dispatch(dashBoardAction.getSellOfDayCount());
    },
    TopAttendedCustomer: () => {
      dispatch(dashBoardAction.getTopAttendedCustomer());
    },
    CountOilSellDay: () => {
      dispatch(dashBoardAction.getCountOilSellDay());
    },
    loadListOfVehicles: () => {
      dispatch(vehicleAction.getVehicles());
    },
    filterListOfVehicle: (filter) => {
      dispatch(vehicleAction.filterVehicle(filter));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    customers : state.customers,
    dashBoard : state.dashBoard,
    posts : state.posts,
    vehicles : state.vehicles,
  }
}

DashBoard = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard));

export default DashBoard
