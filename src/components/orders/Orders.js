import React, { useState, useEffect, useContext, Fragment } from 'react';
import clientAxios from '../../config/axios';

import DetailsOrder from './DetailsOrder';

import { CRMContext } from '../../context/CRMContext';

import { withRouter } from 'react-router-dom';

const Orders = (props) => {

    const [orders, saveOrders] = useState([]);

    const [auth, saveAuth] = useContext(CRMContext);

    useEffect( () => {
        if(auth.token !== ''){
            const fetchOrders = async () => {
                try{
                    const ordersDB = await clientAxios.get('/orders',{
                        headers:{
                            Authorization: `Bearer ${auth.token}`
                        }
                    });
                    saveOrders(ordersDB.data);
                } catch (err){
                    if(err.response.status === 500){
                        props.history.push('/login');
                    }
                }
            }
            fetchOrders();
        }else{
            props.history.push('/login');
        }
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

export default withRouter(Orders);