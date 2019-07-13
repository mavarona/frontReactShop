import React, { useEffect, useState, Fragment } from 'react';

import { Link } from 'react-router-dom';

import Client from './Client';
import Spinner from '../layout/Spinner';

import clientAxios from '../../config/axios';

const Clients = () => {

    const [clients, saveClients] = useState([]);

    const queryAllClients = async () => {
        const results = await clientAxios.get('/clients');
        saveClients(results.data);
    }

    useEffect( () => {
        queryAllClients();
    }, [clients] );

    if(!clients) return <Spinner />;

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

export default Clients;