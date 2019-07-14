import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import clientAxios from '../../config/axios';


const EditClient = (props) => {

    const { id } = props.match.params;

    const [client, dataClient] = useState({
        name: '',
        surname: '',
        company: '',
        email: '',
        phone: ''
    });

    useEffect( () => {

        const queryApi = async () => {
            const clientDB = await clientAxios.get(`/clients/${id}`);
            dataClient(clientDB.data);
        }

        queryApi();
    }, []);

    const updateState = e =>{
        dataClient({
            ...client,
            [e.target.name]: e.target.value
        })
    }

    const updateClient = e => {
        e.preventDefault();
        clientAxios.put(`/clients/${client._id}`, client)
                   .then(res => {
                    if(res.data.code === 11000){
                        Swal.fire({
                            type: 'error',
                            title: 'Error',
                            text: 'Ese correo ya está siendo utilizado'
                        });
                    }else{
                        Swal.fire('Clientes', res.data.message, 'success');
                        props.history.push('/');
                    }
                   });
    }

    const validateClient = () => {
        const { name, surname, company, email, phone } = client;

        return !name.length || !surname.length || !company.length || !email.length || !phone.length;
    }

    return(
        <Fragment>
            <h2>Editar Cliente</h2>

            <form onSubmit={updateClient}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                           placeholder="Nombre Cliente" 
                           name="name" 
                           onChange={updateState} 
                           value={client.name} />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" 
                           placeholder="Apellido Cliente" 
                           name="surname" 
                           onChange={updateState}
                           value={client.surname} />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" 
                           placeholder="Empresa Cliente" 
                           name="company" 
                           onChange={updateState}
                           value={client.company} />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" 
                           placeholder="Email Cliente" 
                           name="email" 
                           onChange={updateState}
                           value={client.email} />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text" 
                           placeholder="Teléfono Cliente" 
                           name="phone" 
                           onChange={updateState}
                           value={client.phone} />
                </div>

                <div className="enviar">
                    <input type="submit" 
                            className="btn btn-azul" 
                            value="Guardar Cambios" 
                            disabled={validateClient()} />
                </div>

            </form>

        </Fragment>
    )
}

export default withRouter(EditClient);