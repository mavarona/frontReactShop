import React, {useState, useEffect, Fragment} from 'react';

import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const EditProduct = (props) => {

    const { id } = props.match.params;

    const [product, dataProduct] = useState({
        name: '',
        price: '',
        img: ''
    });

    const [imgProduct, dataImgProduct] = useState('');
     
    useEffect( () => {

        const fetchProduct = async () => {
            const productDB = await clientAxios.get(`/products/${id}`);
            dataProduct(productDB.data);
        };

        fetchProduct();
    }, []);

    const readInfoProduct = e =>{
        dataProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    }

    const readFile = e => {
        dataImgProduct(e.target.files[0]);
    }

    const validateProduct = () => {
        const { name, price } = product;

        return !name.length || !price.length ;
    }

    const editProduct = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('img', imgProduct);

        try {
            const res = await clientAxios.put(`/products/${id}`, formData, {
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
            <h2>Editar Artículo</h2>

            <form
                onSubmit={editProduct}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                        placeholder="Nombre Artículo" 
                        name="name"
                        onChange={readInfoProduct} 
                        value={product.name} />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" 
                        name="price" 
                        min="0.00" 
                        step="0.10" 
                        placeholder="Precio"
                        onChange={readInfoProduct}
                        value={product.price} />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    { product.img ?(
                        <img src={`http://localhost:5001/${product.img}`} alt={product.name} width="300" />
                    ): null }
                    <input type="file"  
                        name="img"
                        onChange={readFile} />
                </div>

                <div className="enviar">
                    <input type="submit" 
                        className="btn btn-azul" 
                        value="Guardar Cambios"
                        disabled={validateProduct()} />
                </div>
            </form>
        </Fragment>
    )
}

export default withRouter(EditProduct);