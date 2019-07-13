import axios from 'axios';

const clientAxios = axios.create({
    baseURL: 'http://localhost:5001'
});

export default clientAxios;