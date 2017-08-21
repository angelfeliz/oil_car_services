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
import Checkout from './Views/Checkout'
import registerServiceWorker from './registerServiceWorker';
import reducerApp from './reducers/reducerApp';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Navbar,Nav, NavItem } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import './loading.css';


const store = createStore(
  reducerApp,
  applyMiddleware(
    thunkMiddleware  // lets us dispatch() functions
  )
);

const Root = () => (
  <Provider store={store}>
  <Router>
    <div>
    <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to='/'>LubriServ</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
    <Nav pullRight>
      <NavItem eventKey={1} href="#"><Link to='/nuevoCambioAceite/'>Cambio de aceite</Link></NavItem>
      <NavItem eventKey={2} href="#"><Link to='/nuevoProducto'>Producto</Link></NavItem>
      <NavItem eventKey={3} href="#"><Link to='/customer'>Cliente</Link></NavItem>
      <NavItem eventKey={5} href="#"><Link to='/nuevoVehiculo'>Vehiculo</Link></NavItem>
      <NavItem eventKey={4} href="#"><Link to='/caja'>Caja</Link></NavItem>


    </Nav>
    </Navbar.Collapse>
  </Navbar>
  <Route exact path='/' component={DashBoard}/>
  <Route path='/nuevoCambioAceite/' component={ oilChangeServices }/>
  <Route path='/cambioAceiteCliente/:id' component={ oilChangeServices }/>
  <Route path='/nuevoProducto' component={Product} />
  <Route path='/customer' component={Customer}/>
  <Route path='/nuevoVehiculo' component={Vehicle}/>
  <Route path='/caja' component={Checkout}/>

   </div>
  </Router>
</Provider>
)

ReactDOM.render(
 <Root/>,
 document.getElementById('root'));
registerServiceWorker();
