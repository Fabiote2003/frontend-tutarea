import React, { createContext, useContext, useEffect, useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { allPoryectByUserAPI, loginAPI, perfilAPI, registerAPI } from "../apiReq/userAPI";
import clienteAxios from "../config/clienteAxios";

const userContext = createContext();

export const useUser = () => {
  const context = useContext(userContext);
  return context;
};

export const UserProvaider = ({ children }) => {
  const navigate = useNavigate();
  
  const [allProyectByUser,setAllProyectByUser]=useState([]);
  const [perfil, setPerfil] = useState({});
  //creo este estado asi, una ves registrodo lo redirecciono al login y cargo los datos sel usuario sin volver a solicitarlos
  const [userEmailForLogin, setUserEmailForLogin] = useState("");
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});


  const allPoryectByUserContext= async() => {

    const token = localStorage.getItem('token');


    if(!token) {
      return;
    }
    
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    try {
      const {data} = await clienteAxios.get(`/usuario/proyectByUser/${auth.id}`,config)
      setAllProyectByUser(data)
    } catch (error) {
        console.log("error en el contex de usuario allPoryectByUserContext",error);
    }                                          
  }

  useEffect(() => {
    allPoryectByUserContext();
  }, [auth,navigate]);

  const loginContext = async (user) => {
      try {
        const rta = await loginAPI(user);
        if (rta.status === 200) {
            localStorage.setItem('token', rta.token);
            await obtenerPerfil(rta.token);
            await allPoryectByUserContext(rta.id, rta.token);
            navigate('/trabajos')
            return true;
      }else {
        Swal.fire({
          icon: 'error',
          title: '¡Email o contraseña incorrectos!',
          text: 'Intentalo de nuevo.',
          confirmButtonColor: "#457B9D"
        })
      }
    } catch (error) {
      console.log("Error de login",error);
    }
  };

  const registerContext = async (user) => {
    console.log("que llega al context?????", user);
    try {
      const rta = await registerAPI(user);
      if (rta.status === 200) {
        setUserEmailForLogin(rta.data.email);
        return true
        
      } else {
        Swal.fire({
          icon: 'error',
          title: '¡Ya hay un usuario registrado con ese email!',
          text: 'Intenta con otro email.',
          confirmButtonColor: '#457B9D'
        })
      }
    } catch (error) {
      console.log("error de context usercontex catch error", error);
    }
  };

  const obtenerPerfil = async (token) => {

    try {
      const res = await perfilAPI(token);
      setAuth(res);
    } catch (error) {
      console.log("Error de perfil de usuario", error);
    }

  } 

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token');

      if(!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        const {data} = await clienteAxios.get('/usuario/giu', config);
        setAuth(data);
        
      } catch (error) {
        console.log(error);
      }

      setCargando(false);
    }

    autenticarUsuario();
  }, [])

  return (
    <userContext.Provider
      value={{
        loginContext,
        registerContext,
        setUserEmailForLogin,
        userEmailForLogin,
        auth,
        cargando,
        allProyectByUser,
        perfil,
        obtenerPerfil
      }}>
      {children}
    </userContext.Provider>
  )
}
