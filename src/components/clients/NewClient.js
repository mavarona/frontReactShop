import React, { Fragment, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import clientAxios from '../../config/axios';

import { CRMContext } from '../../context/CRMContext';

const NewClient = ({history}) => {

    const [client, saveClient] = useState({
        name: '',
        surname: '',
        company: '',
        email: '',
        phone: ''
    });

    const [auth, saveAuth] = useContext(CRMContext);

    const updateState = e =>{
        saveClient({
            ...client,
            [e.target.name]: e.target.value
        })
    }

    const validateClient = () => {
        const { name, surname, company, email, phone } = client;

        return !name.length || !surname.length || !company.length || !email.length || !phone.length;
    }

    const addClient = e =>{
        
        e.preventDefault();

        clientAxios.post('/clients', client)
                    .then( res => {
                        if(res.data.code === 11000){
                            Swal.fire({
                                type: 'error',
                                title: 'Error',
                                text: 'Ese correo ya está siendo utilizado'
                            });
                        }else{
                            Swal.fire('Clientes', res.data.message, 'success');
                            history.push('/');
                        }
                    });

    }

    if(!auth.auth){
        history.push('/login');
    }

    return(
        <Fragment>
            <h2>Nuevo Cliente</h2>

            <form onSubmit={addClient}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                           placeholder="Nombre Cliente" 
                           name="name" 
                           onChange={updateState} />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" 
                           placeholder="Apellido Cliente" 
                           name="surname" 
                           onChange={updateState} />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" 
                           placeholder="Empresa Cliente" 
                           name="company" 
                           onChange={updateState} />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" 
                           placeholder="Email Cliente" 
                           name="email" 
                           onChange={updateState} />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text" 
                           placeholder="Teléfono Cliente" 
                           name="phone" 
                           onChange={updateState} />
                </div>

                <div className="enviar">
                        <input type="submit" 
                               className="btn btn-azul" 
                               value="Agregar Cliente" 
                               disabled={validateClient()} />
                </div>

            </form>

        </Fragment>
    )
}

export default withRouter(NewClient);