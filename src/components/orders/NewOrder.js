import React, { useState, useEffect, useContext ,Fragment} from 'react';
import clientAxios from '../../config/axios';
import Swal from 'sweetalert2';

import SearchProduct from './SearchProduct';
import FormQuantityProduct from './FormQuantityProduct';
import { withRouter } from 'react-router-dom';

import { CRMContext } from '../../context/CRMContext';

const NewOrder = (props) => {

    const { id } = props.match.params;

    const [client, saveClient] = useState({});
    const [search, saveSearch] = useState('');
    const [products, saveProducts] = useState([]);
    const [total, saveTotal] = useState(0);

    const [auth, saveAuth] = useContext(CRMContext);

    useEffect( () => {

        const fetchClient = async () => {
            const clientDB = await clientAxios.get(`/clients/${id}`);
            saveClient(clientDB.data);
        }

        const updateTotal = () => {
            if(products.length === 0){
                saveTotal(0);
                return;
            }
            let resTotal = 0;
            products.map(product=>resTotal += (product.quantity * product.price));
            saveTotal(resTotal);
        }

        fetchClient();
        updateTotal();
    }, [products]);

    const searchProduct = async e => {
        e.preventDefault();
        const resultSearch = await clientAxios.post(`/products/search/${search}`);
        if(resultSearch.data[0]){
            let productDB = resultSearch.data[0];
            productDB.product = resultSearch.data[0]._id;
            productDB.quantity = 0;
            saveProducts([...products, productDB]);
        } else {
            Swal.fire({
                type: 'info',
                title: 'Búsqueda de Productos',
                text: 'No se han encontrado productos'
            });
        }

    }

    const readDataSearch = e => {
        saveSearch(e.target.value);
    }

    const substractProduct = i => {
        const allProducts = [...products];
        if (allProducts[i].quantity === 0) return;
        allProducts[i].quantity--;
        saveProducts(allProducts);
    }

    const sumProduct = i => {
        const allProducts = [...products];
        allProducts[i].quantity++;
        saveProducts(allProducts);
    }

    const deleteProductFromOrder = id => {
        const allProducts = products.filter(product => product.product !== id);
        saveProducts(allProducts);
    }

    const processOrder = async e => {
        e.preventDefault();
        const { id } = props.match.params;
        const order ={
            "client": id,
            products,
            total
        }
        const res = await clientAxios.post(`/orders/new/${id}`, order);

        if(res.status === 200){
            Swal.fire({
                type: 'success',
                title: 'Pedidos',
                text: res.data.message 
            });
        }else{
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo' 
            });
        }

        props.history.push('/');

    }

    if(!auth.auth){
        props.history.push('/login');
    }

    return ( 
        <Fragment>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {client.name} {client.surname}</p>
                <p>Teléfono: {client.phone}</p>
            </div>

            <SearchProduct
                searchProduct={searchProduct} 
                readDataSearch={readDataSearch} />

            <ul className="resumen">
                {products.map((product, index) =>(
                    <FormQuantityProduct 
                        key={product.product}
                        product={product}
                        substractProduct={substractProduct}
                        sumProduct={sumProduct}
                        deleteProductFromOrder={deleteProductFromOrder}
                        index={index}
                    />
                ))}
            </ul>
            <p className="total">Total a pagar: <span>${total}</span></p>

            { total > 0 ? (
                    <form
                        onSubmit={processOrder}
                    >
                        <input type="submit"
                               className="btn btn-verde btn-block"
                               value="Tramitar Pedido" />
                    </form>
                ): null
            }        
        
        </Fragment>
    )
}

export default withRouter(NewOrder);