import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import clientAxios from '../../config/axios';

const Product = ({product}) => {

    const { _id, name, price, img } = product;

    const deleteProduct = id => {
        Swal.fire({
            title: 'Eliminar Artículo',
            text: "¿Estás seguro?, Si eliminas el articulo no podrá ser recuperado",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                clientAxios.delete(`/products/${id}`)
                           .then( res => {
                               if(res.status === 200){
                                    Swal.fire(
                                        'Articulos',
                                        res.data.message,
                                        'success'
                                    );
                               }
                           });
            }
          });
    }

    return ( 

        <Fragment>
            <h2> Producto </h2>
            <li className="producto">
                <div className="info-producto">
                    <p className="nombre">{name}</p>
                    <p className="precio">{price} €</p>
                    { img ? (<img src={`http://localhost:5001/${img}`} />) : null }
                </div>
                <div className="acciones">
                    <Link  to={`/products/edit/${_id}`} className="btn btn-azul">
                        <i className="fas fa-pen-alt"></i>
                        Editar Producto
                    </Link >
                    <button type="button" 
                            className="btn btn-rojo btn-eliminar"
                            onClick={() => deleteProduct(_id)}
                            >
                        <i className="fas fa-times"></i>
                        Eliminar Cliente
                    </button>
                </div>
            </li>
        </Fragment>

    )
}

export default Product;