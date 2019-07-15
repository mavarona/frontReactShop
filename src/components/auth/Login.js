import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import clientAxios from '../../config/axios';

import { CRMContext } from '../../context/CRMContext';

const Login = (props) => {

    const [auth, saveAuth] = useContext(CRMContext);

    const [credentials, saveCredentials] = useState({
        email: '',
        password: ''
    });

    const readData = e => {
        saveCredentials({
            ...credentials,
            [e.target.name] : e.target.value
        })
    };

    const login = async e => {
        e.preventDefault();

        try {
            const res = await clientAxios.post('/login', credentials);
            const { token } = res.data;
            localStorage.setItem('token', token);
            saveAuth({
                token,
                auth: true
            });
            props.history.push('/');
        } catch(err){
            console.log(err);
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: err.response.data.message
            })
        }

    }

    return(
        <div className="login">
            <h2>Login</h2>
            <div className="contenedor-formulario">
                <form
                    onSubmit={login}
                >
                    <div className="campo">
                        <label>Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="E-Mail"
                            required
                            onChange={readData} />
                    </div>
                    <div className="campo">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password"
                            required
                            onChange={readData} />
                    </div>
                    <input 
                        type="submit"
                        value="Login"
                        className="btn btn-verde btn-block"
                    />
                </form>
            </div>
        </div>
    )

}

export default withRouter(Login);