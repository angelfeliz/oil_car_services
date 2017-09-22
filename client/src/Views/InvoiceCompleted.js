import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import * as checkoutAction from '../actions/checkoutAction';
import PrintReceipt from './PrintReceipt';
import { BoxModel } from './util/BoxModel';

class InvoiceComplete extends React.Component {
  constructor(props) {
    super(props);
  }

   onClickCancelDelete = () => {
     this.props.cleanCheckoutItem();
     this.props.showDeleteDialog();
   }
   onClickEliminete = (checkoutObj) => {
     this.props.processCheckout(checkoutObj);
     this.props.showDeleteDialog();
  }
  onChangeFilter = (e) => {
    this.props.findSell(e.target.value);
  }

  onClickReimprimir = (checkoutObj) => {
    this.props.processCheckout(checkoutObj);
    window.setTimeout(function(){
       window.print();
    },400);
  }

  onChangeFilterStatus = (e) => {
    this.props.cleanFilter();
    this.props.loadAllSells(e.target.value);
  }

  onClickEditServices = (checkoutObj) => {
     this.props.processCheckout(checkoutObj);
     this.props.ridirectInvoice();
  }

  componentDidMount() {
    this.props.loadAllSells("pending");
  }
  componentWillUnmount() {
    this.props.cleanInvoice();
  }
  render(){
    let checkoutMaching = this.props.checkoutMaching;
    let checks = checkoutMaching.sell.map(item =>item);
    return checkoutMaching.isRidirect ?
      checkoutMaching.checkoutItem.services == "cambio de aceite" ?
        <Redirect to={`/cambioAceiteCliente/edit/${checkoutMaching.checkoutItem}`}/>
      :
        <Redirect to={`/generalServices/edit/${checkoutMaching.checkoutItem}`}/>
    :
    (

       <div>
       {checkoutMaching.showDialog ?
          <BoxModel
             onClickAccept = {this.props.eliminate}
             onClickCancel = {this.onClickCancelDelete}
             text = {"Esta seguro que quiere eliminar la factura?"}
             name = {checkoutMaching.checkoutItem.firstName + " " + checkoutMaching.checkoutItem.lastName}
          />
          : null
       }
          <div className="not_show_in_screen show_in_print">
            <PrintReceipt
            checkoutItem = {checkoutMaching.checkoutItem}
              />
           </div>
           <div className="not_show_in_print">
           <div className="col-xs-4 col-sm-3 col-md-2 col-lg-2">
             <div className="form-group">
               <label className="sr-only"></label>
               <input onClick={(e) => this.onChangeFilterStatus(e)}  type="radio" name="filterStatu" value="pending" defaultChecked /><span> Pendientes</span>
             </div>
           </div>
           <div className="col-xs-4 col-sm- col-md-2 col-lg-2">
             <div className="form-group">
               <label className="sr-only"></label>
               <input onClick={(e) => this.onChangeFilterStatus(e)}  type="radio" name="filterStatu" value="complete" /><span> Completadas</span>
             </div>
           </div>
           <div className="row">
             <div className="col-lg-6 col-lg-offset-6 col-md-6 col-md-offset-6 col-sm-12 col-xs-12">
               <input type="text" className="form-control" value={checkoutMaching.filter} onChange={(e)=>this.onChangeFilter(e)} placeholder="Buscar factura" />
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
                <td>{item.customer.firstName}
                </td>
                <td>{item.customer.lastName}</td>
                <td>{item.services}</td>
                <td>{item.customer.phoneNumber}
                </td>
                <td>{item.totalNeto}</td>
                <td>
                {
                  item.statu == "pending" ?
                    <button onClick={()=>{this.onClickEditServices(item)}} type="button" className="btn btn-default">Editar</button>
                    :
                    <div>
                      <button onClick={()=>{this.onClickReimprimir(item)}} type="button" className="btn btn-default">Reimprimir</button>  <button onClick={()=>{this.onClickEliminete(item)}} type="button" className="btn btn-default">Anular</button>
                    </div>
                }
                </td>
              </tr>
            )
          })
         }
          </tbody>
          </table>
        }
        </div>
        </div>
    )
  }
}

let mapStateToProps = (state) => ({
  checkoutMaching : state.checkoutMaching
})

let mapDispatchToProps = (dispatch) => ({
  cleanInvoice: () => {
    dispatch(checkoutAction.cleanInvoice());
  },
  showDeleteDialog: () => {
    dispatch(checkoutAction.showDialog());
  },
  eliminate: (services) => {
    dispatch(checkoutAction.eliminate(services));
  },
  findSell: (word) => {
    dispatch(checkoutAction.findSell(word));
  },
  loadAllSells: (statu) => {
    dispatch(checkoutAction.loadAllSells(statu));
  },
  processCheckout: (item) => {
    dispatch(checkoutAction.processCheckout(item));
  },
  cleanCheckoutItem: () => {
    dispatch(checkoutAction.cleanCheckoutItem());
  },
  cleanFilter: () => {
     dispatch(checkoutAction.cleanFilter());
  },
  ridirectInvoice: () => {
    dispatch(checkoutAction.ridirectInvoice());
  }
})

InvoiceComplete = withRouter(connect(mapStateToProps, mapDispatchToProps)(InvoiceComplete));

export default InvoiceComplete;
