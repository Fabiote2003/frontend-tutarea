import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `http://localhost:3000/api/v1`
 //baseURL: `https://tutareaback.onrender.com/api/v1`
});

export default clienteAxios;