import React, { Fragment } from 'react';

const DetailsOrder = ({order}) => {

    const {client} = order;

    return ( 
        <Fragment>
            <li className="pedido">
                <div className="info-pedido">
                    <p className="id">ID: 0192019201291201</p>
                    <p className="nombre">Cliente: {client.name} {client.surname}</p>

                    <div className="articulos-pedido">
                        <p className="productos">Artículos Pedido: </p>
                        <ul>
                            {order.products.map(product =>(
                                <li key={order._id+product.product._id}>
                                    <p>{product.product.name}</p>
                                    <p>Precio:{product.product.price}</p>
                                    <p>Cantidad: {product.quantity}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="total">Total: {order.total} € </p>
                </div>
                <div className="acciones">

                    <button type="button" className="btn btn-rojo btn-eliminar">
                        <i className="fas fa-times"></i>
                        Eliminar Pedido
                    </button>
                </div>
            </li>
        </ Fragment>
    )
}

export default DetailsOrder;