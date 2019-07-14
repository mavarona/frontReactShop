import React, { Fragment } from 'react';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

/** Layout */
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';

/** Components */
import Clients from './components/clients/Clients';
import NewClient from './components/clients/NewClient';
import EditClient from './components/clients/EditClient';

import Products from './components/products/Products';
import NewProduct from './components/products/NewProduct';
import EditProduct from './components/products/EditProduct';

import Orders from './components/orders/Orders';
import NewOrder from './components/orders/NewOrder';

import Login from './components/auth/Login';

function App() {
    return ( 
        <Router>
            <Fragment>
                <Header />
                <div className="grid contenedor contenido-principal">
                    <Navbar />
                    <main className="caja-contenido col-9">
                        <Switch>
                            <Route exact path="/" component={Clients} />
                            <Route exact path="/clients/new" component={NewClient} />
                            <Route exact path="/clients/edit/:id" component={EditClient} />

                            <Route exact path="/products" component={Products} />
                            <Route exact path="/products/new" component={NewProduct} />
                            <Route exact path="/products/edit/:id" component={EditProduct} />

                            <Route exact path="/orders" component={Orders} />
                            <Route exact path="/orders/new/:id" component={NewOrder} />

                            <Route exact path="/login" component={Login} />

                        </Switch>
                    </main>
                </div>
            </Fragment>
        </Router>
    )
}

export default App;