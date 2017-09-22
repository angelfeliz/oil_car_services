import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import Product from './Views/Products/Product';
import Customer from './Views/Customers/Customer';
import Vehicle from './Views/Vehicles/Vehicle';
import oilChangeServices from './Views/OilChangeServices/OilChangeServicesForm';
import DashBoard from './Views/DashBoard';
import Checkout from './Views/Checkout';
import GeneralServicesForm from './Views/GeneralServices/GeneralServicesForm';
import InvoiceCompleted from './Views/InvoiceCompleted';
import registerServiceWorker from './registerServiceWorker';
import reducerApp from './reducers/reducerApp';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Navbar,Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import './loading.css';


const store = createStore(
  reducerApp,
  applyMiddleware(
    thunkMiddleware  // lets us dispatch() functions async
  )
);

const Root = () => (
  <Provider store={store}>
  <Router>
    <div>
    <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to='/'><img className="logo_header" src={require('./logo_lubriserv_w.png')}/></Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
    <Nav pullRight>
      <NavItem eventKey={1} href="#"><Link to='/nuevoCambioAceite/'>Cambio de aceite</Link></NavItem>
      <NavItem eventKey={2} href="#"><Link to='/nuevoProducto'>Producto</Link></NavItem>
      <NavItem eventKey={3} href="#"><Link to='/customer'>Cliente</Link></NavItem>
      <NavItem eventKey={4} href="#"><Link to='/nuevoVehiculo'>Vehiculo</Link></NavItem>
      <NavDropdown eventKey={5} title="Facturas" id="basic-nav-dropdown">
          <MenuItem eventKey={5.1}><Link to='/caja'>Caja</Link></MenuItem>
          <MenuItem eventKey={5.2}><Link to='/facturas'>Pendientes/Despachadas</Link></MenuItem>
      </NavDropdown>

      <NavItem eventKey={6} href="#"><Link to='/generalServices'>Ventas generales</Link></NavItem>
    </Nav>
    </Navbar.Collapse>
  </Navbar>
  <Route exact path='/' component={DashBoard}/>
  <Route path='/nuevoCambioAceite/' component={ oilChangeServices }/>
  <Route path='/cambioAceiteCliente/:id' component={ oilChangeServices }/>
  <Route path='/cambioAceiteCliente/edit/:checkout' component={ oilChangeServices }/>
  <Route path='/nuevoProducto' component={Product} />
  <Route path='/customer' component={Customer}/>
  <Route path='/nuevoVehiculo' component={Vehicle}/>
  <Route path='/caja' component={Checkout}/>
  <Route path='/generalServices' component={GeneralServicesForm}/>
  <Route path='/generalServices/edit/:checkout' component={GeneralServicesForm}/>
  <Route path='/facturas' component={InvoiceCompleted}/>

   </div>
  </Router>
</Provider>
)

ReactDOM.render(
 <Root/>,
 document.getElementById('root'));
registerServiceWorker();
