import React from 'react';

const FormQuantityProduct = (props) => {


    const { product, substractProduct, sumProduct, deleteProductFromOrder, index } = props;

    return ( 
        <li>
        <div className="texto-producto">
            <p className="nombre">{product.name}</p>
            <p className="precio">{product.price}</p>
        </div>
        <div className="acciones">
            <div className="contenedor-cantidad">
                <i className="fas fa-minus" onClick={() => substractProduct(index)}></i>
                <p>{product.quantity}</p>
                <i className="fas fa-plus" onClick={() => sumProduct(index)}></i>
            </div>
            <button 
                type="button" 
                className="btn btn-rojo"
                onClick={()=>deleteProductFromOrder(product.product)} >
                <i className="fas fa-minus-circle"></i>
                    Eliminar Producto
            </button>
        </div>
    </li>
    )
}

export default FormQuantityProduct;