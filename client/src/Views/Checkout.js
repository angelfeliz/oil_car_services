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

  onChangeDesc = (e) => {
       this.props.doDesc(e.target.value);
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
    let word = e.target.value;
    this.props.findSell(word);
  }

  render() {
     let checkoutMaching = this.props.checkoutMaching;
    let checks = checkoutMaching.sell.map(item =>item);
    return (
      <div className="container">
      {
         checkoutMaching.isAbortBySystem
            ? (<div className="alert alert-warnning">
                La operación fue abortada por el sístema.</div>)
            : null
      }
      <div className="row">
        <div className="col-lg-6 col-lg-offset-6 col-md-6 col-md-offset-6 col-sm-12 col-xs-12">
          <input type="text" className="form-control" onChange={(e)=>this.onChangeFindCheckout(e)} placeholder="Buscar factura" />
        </div>
      </div>
      {
        checkoutMaching.isNoMatch
        ?
        <div className="row">
                 <h2>No se encontro ninguna factura</h2>
        </div>
        :
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
           <td>{item.phoneNumber}
           </td>
           <td>{item.totalNeto}</td>
           <td>
             <button onClick={()=>{this.onClickProcessCheckout(item)}} type="button" className="btn btn-default">Procesar</button>
           </td>
         </tr>
       )
     })
    }
     </tbody>
     </table>
   }
<div>
     {
       checkoutMaching.isModalVisible
         ? <CheckoutBoxModel
             checkoutItem= {checkoutMaching.checkoutItem}
             onClickPaymentType = {this.props.onClickPaymentType}
             onClickProcessCheckout={this.onClickProcessCheckout}
             onClickCancelCheckout = {this.onClickCancelCheckout}
             onChangeDesc = {this.onChangeDesc}
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
    doDesc: (desc) => {
      dispatch(checkoutAction.doDesc(desc));
    },
    findSell: (word) => {
      dispatch(checkoutAction.findSell(word));
    },
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
