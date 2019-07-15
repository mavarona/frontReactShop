import React, { Fragment, useEffect, useState, useContext } from 'react';

import { Link, withRouter } from 'react-router-dom';
import Product from './Product'
import Spinner from '../layout/Spinner';

import clientAxios from '../../config/axios';

import { CRMContext } from '../../context/CRMContext';

const Products = (props) => {


    const [products, saveProducts] = useState([]);

    const [auth, saveAuth] = useContext(CRMContext);

    useEffect( () => {
        if(auth.token !== ''){
            const fetchProducts = async () => {
                try{
                    const productsDB = await clientAxios.get('/products',{
                        headers:{
                            Authorization: `Bearer ${auth.token}`
                        }
                    });
                    saveProducts(productsDB.data);
                } catch (err){
                    if(err.response.status === 500){
                        props.history.push('/login');
                    }
                }
            } 
            fetchProducts();
        }else{
            props.history.push('/login');
        }
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

export default withRouter(Products);