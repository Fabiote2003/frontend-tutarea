import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginAPI, registerAPI } from "../apiReq/userAPI";
import clienteAxios from "../config/clienteAxios";

const userContext = createContext();

export const useUser = () => {
  const context = useContext(userContext);
  return context;
};

export const UserProvaider = ({ children }) => {
  const navigate = useNavigate();

  //pongo los datos del usuario loguedado
  const [userLogued, setUserLogued] = useState([]);
  //creo este estado asi, una ves registrodo lo redirecciono al login y cargo los datos sel usuario sin volver a solicitarlos
  const [userEmailForLogin, setUserEmailForLogin] = useState("");
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});

  const loginContext = async (user) => {
    try {
      const rta = await loginAPI(user);
      if (rta.status === 200) {
        localStorage.setItem('token', rta.token);
        setUserLogued(rta);
        navigate("/trabajos")
        return true
      }else {
        Swal.fire({
          icon: 'error',
          title: '¡Email o contraseña incorrectos!',
          text: 'Intentalo de nuevo.',
          confirmButtonColor: "#457B9D"
        })
      }
    } catch (error) {
      return error("No se puedo realizar el Login");
    }
  };

  const registerContext = async (user) => {
    console.log("que llega al context?????", user);
    try {
      const rta = await registerAPI(user);
      console.log("registerContext",rta);
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
        cargando
      }}>
      {children}
    </userContext.Provider>
  )
}
