import React, { useState, Fragment } from 'react';

import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';

const NewProduct = () => {

    const [product, saveProduct] = useState({
        name: '',
        price: ''
    });

    const [imgProduct, saveImgProduct] = useState('');

    const readInfoProduct = e =>{
        saveProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    }

    const readFile = e => {
        saveImgProduct(e.target.files[0]);
    }

    const validateProduct = () => {

        const { name, price } = product;

        return !name.length || !price.length ;
    }

    const addProduct = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('img', imgProduct);

        try {
            const res = await clientAxios.post('/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if(res.status === 200){
                Swal.fire('Artículos', res.data.message, 'success');
            }
        } catch (err){
            console.log(err);
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo' 
            });
        }

    }

    return ( 
        <Fragment>
            <h2>Nuevo Artículo</h2>

            <form
                onSubmit={addProduct}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                        placeholder="Nombre Artículo" 
                        name="name"
                        onChange={readInfoProduct} />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" 
                        name="price" 
                        min="0.00" 
                        step="0.10" 
                        placeholder="Precio"
                        onChange={readInfoProduct} />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file"  
                        name="img"
                        onChange={readFile} />
                </div>

                <div className="enviar">
                        <input type="submit" 
                            className="btn btn-azul" 
                            value="Añadir Artículo"
                            disabled={validateProduct()} />
                </div>
            </form>
        </Fragment>
    )
}

export default NewProduct;