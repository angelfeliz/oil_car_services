import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import * as checkoutAction from '../actions/checkoutAction';
import { CheckoutBoxModel } from './util/BoxModel';


class Checkout extends Component {
  constructor(props) {
    super(props);
    this.onClickProcessCheckout = this.onClickProcessCheckout.bind(this);
  }

  onClickProcessCheckout(checkoutObj) {
    console.log(checkoutObj);
    this.props.processCheckout(checkoutObj);
  }

  onClickCancelCheckout = () => {
    this.props.cancelCheckout();
  }

  onClickPaymentType  = (e) => {
    let paymentType = e.target.value;
    if(paymentType) {
      this.paymentTypeChange(paymentType);
    }

  }

  componentDidMount() {
   this.props.loadAllSells();
  }

  onChangeFindCheckout = (e) => {
    let words = e.target.value;
  }

  render() {

    let checks = this.props.checkoutMaching.sell.map(item =>item);
    return (
      <div className="container">
      {
        this.props.checkoutMaching.isRidirectToInvoice
          ? <Redirect to='/invoice'/>
          : this.props.checkoutMaching.isAbortBySystem
            ? (<div className="alert alert-warnning">
                La operación fue abortada por el sístema.</div>)
            : null
      }
      <div className="row">
        <div className="col-lg-6 col-lg-offset-6 col-md-6 col-md-offset-6 col-sm-12 col-xs-12">
          <input type="text" className="form-control" onChange={(e)=>this.onChangeFindCheckout(e)} />
        </div>
      </div>
      <table className = "table table-striped table-hover">
      <thead>
       <tr>
         <th>Id</th>
         <th>Nombre</th>
         <th>Apellido</th>
         <th>Servicio</th>
         <th>Numero</th>
         <th>Total</th>
         <th>
           <i className="fa fa-server" aria-hidden="true"></i>
         </th>
       </tr>
     </thead>
     <tbody>
     {checks.map((item) => {
       return (
         <tr key={item.services_id}>
           <td>{item.services_id}</td>
           <td>{item.firstName}
           </td>
           <td>{item.lastName}</td>
           <td>{item.services}</td>
           <td>{item.placeNumber}
           </td>
           <td>{item.totalNeto}</td>
           <td>
             <button onClick={()=>this.onClickProcessCheckout(item)} type="button" className="btn btn-default">Procesar</button>
           </td>
         </tr>
       )
     })
    }
     </tbody>
     </table>
<div>
     {
       this.props.checkoutMaching.isModalVisble
         ? <CheckoutBoxModel
             total={this.props.checkoutMaching.total}
             firstName={this.props.checkoutMaching.firstName}
             lastName={this.props.checkoutMaching.lastName}
             services={this.props.checkoutMaching.services}
             onClickPaymentType = {this.props.onClickPaymentType}
             onClickProcessCheckout={this.onClickProcessCheckout}
             onClickCancelCheckout = {this.onClickCancelCheckout}
             />
         : null
     }
     </div>
     </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {checkoutMaching: state.checkoutMaching}
}

let mapDispatchToProps = (dispatch) => {
  return {
    loadAllSells: () => {
      dispatch(checkoutAction.loadAllSells());
    },
    confirmedCheckout: (check) => {
      dispatch(checkoutAction.confirmedCheckout(check));
    },
    cancelCheckout: () => {
      dispatch(checkoutAction.cancelModalViewCheckout());
    },
    processCheckout: (checkout) => {
      dispatch(checkoutAction.processCheckout(checkout));
    },
    paymentTypeChange: (type) => {
      dispatch(checkoutAction.paymentTypeChange(type));
    }
  }
}

  Checkout = withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));

  export default Checkout;
