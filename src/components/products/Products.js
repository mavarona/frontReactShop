import React, { Fragment, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import Product from './Product'
import Spinner from '../layout/Spinner';

import clientAxios from '../../config/axios';

const Products = () => {


    const [products, saveProducts] = useState([]);

    const fetchProducts = async () => {
        const productsDB = await clientAxios.get('/products');
        saveProducts(productsDB.data);
    } 

    useEffect( () => {
        fetchProducts();
    }, [products]);

    if(!products) return <Spinner />;

    return ( 
        <Fragment>
           <h2>Artículos</h2>

            <Link to={"/products/new"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {products.map(product => (
                    <Product key={product._id} product={product} />
                ))}
            </ul>
        </Fragment>
    )
}

export default Products;