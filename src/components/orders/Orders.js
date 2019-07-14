import React, { useState, useEffect, Fragment } from 'react';
import clientAxios from '../../config/axios';

import DetailsOrder from './DetailsOrder';

const Orders = () => {

    const [orders, saveOrders] = useState([]);

    useEffect( () => {

        const fetchOrders = async () => {
            const ordersDB = await clientAxios.get('/orders');
            saveOrders(ordersDB.data);
        }

        fetchOrders();

    }, []);

    return ( 
       <Fragment>
                    
            <h2>Pedidos</h2>

            <ul className="listado-pedidos">
                {orders.map(order => (
                    <DetailsOrder 
                        key={order._id}
                        order={order}
                    />
                ))}
            </ul>    
       </ Fragment>
    )
}

export default Orders;