import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import * as checkoutAction from '../actions/checkoutAction';
import CheckoutBoxModel from './util/CheckoutBoxModel';


class Checkout extends Component {
  constructor(props) {
    super(props);
    this.onClickProcessCheckout = this.onClickProcessCheckout.bind(this);
  }

  onClickProcessCheckout(checkoutObj) {
    console.log(checkoutObj);
    this.props.processCheckout(checkoutObj);
  }

  componentWillMount() {
    this.props.loadOilChangeServices();
  }

  render() {
    let checks = this.props.checkoutMaching.oilChangeServices.filter((item) => {
      if (!item.isPaid) {
        return {
          _id: item._id,
          firstName: item.firstName,
          lastName: item.lastName,
          services: "cambio de aceite",
          placeNumber: item.placeNumber,
          total: item.total
        }
      }
    })
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
         <tr key={item._id}>
           <td>{item.id}</td>
           <td>{item.firstName}
           </td>
           <td>{item.lastName}</td>
           <td>{item.services}</td>
           <td>{item.placeNumber}
           </td>
           <td>{item.total}</td>
           <td>
             <button onClick={this.onClickProcessCheckout(item)} type="button" className="btn btn-default">Procesar</button>
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
             cancelCheckOut={this.props.cancelCheckOut}
              onClickConfirmedCheckout={this.onClickConfirmedCheckout}/>
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
    loadOilChangeServices: () => {},
    confirmedCheckout: (check) => {
      dispatch(checkoutAction.confirmedCheckout(check));
    },
    cancelCheckOut: () => {
      dispatch(checkoutAction.cancelModalViewCheckout());
    },
    processCheckout: (checkout) => {
      dispatch(checkoutAction.processCheckout(checkout));
    },
  }
}

  Checkout = withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));

  export default Checkout;
