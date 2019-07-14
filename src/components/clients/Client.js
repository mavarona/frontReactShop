import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';

const Client = ({client}) => {

    const { _id, name, surname, company, email, phone } = client;

    const deleteClient = id => {
 
        Swal.fire({
            title: 'Eliminar Cliente',
            text: "¿Está seguro?, una vez eliminado no podrá ser recuperado",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                clientAxios.delete(`/clients/${id}`)
                           .then( res =>{
                                Swal.fire(
                                    'Clientes',
                                    res.data.message,
                                    'success'
                                );
                           });
            }
          });

    }

    return(
        <li className="cliente">
        <div className="info-cliente">
            <p className="nombre">{name} {surname}</p>
            <p className="empresa">{company}</p>
            <p>{email}</p>
            <p>{phone}</p>
        </div>
        <div className="acciones">
            <Link to={`/clients/edit/${_id}`} className="btn btn-azul">
                <i className="fas fa-pen-alt"></i>
                Editar Cliente
            </Link>
            <Link to={`/orders/new/${_id}`} className="btn btn-amarillo">
                <i className="fas fa-plus"></i>
                Nuevo Pedido
            </Link>
            <button 
                type="button" 
                className="btn btn-rojo btn-eliminar"
                onClick={() => deleteClient(_id)}>
                <i className="fas fa-times"></i>
                Eliminar Cliente
            </button>
        </div>
    </li>
    )
}

export default Client;