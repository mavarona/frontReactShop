import React, { useEffect, useState, useContext, Fragment } from 'react';

import { Link, withRouter } from 'react-router-dom';

import Client from './Client';
import Spinner from '../layout/Spinner';

import clientAxios from '../../config/axios';

import { CRMContext } from '../../context/CRMContext';

const Clients = (props) => {

    const [clients, saveClients] = useState([]);

    const [auth, saveAuth] = useContext(CRMContext);

    useEffect( () => {
        if(auth.token !== ''){
            const queryAllClients = async () => {
                try{
                    const results = await clientAxios.get('/clients',{
                        headers:{
                            Authorization: `Bearer ${auth.token}`
                        }
                    });
                    saveClients(results.data);
                } catch (err){
                    if(err.response.status === 500){
                        props.history.push('/login');
                    }
                }
            }
            queryAllClients();
        }else{
            props.history.push('/login');
        }

    }, [clients] );

    if(!auth.auth) props.history.push('/login');

    if(!clients.length) return <Spinner />;

    return ( 
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clients/new"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                    Nuevo Cliente
            </Link>

            <ul className="listado-clientes">
                {clients.map( client => (
                  <Client client={client} key={client._id} />
                ))}
            </ul>
        </Fragment>
    )
}

export default withRouter(Clients);