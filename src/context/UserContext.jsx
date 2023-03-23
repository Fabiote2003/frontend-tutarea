import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { allPoryectByUserAPI, loginAPI, perfilAPI, registerAPI,listAllUsersAPI } from "../apiReq/userAPI";
import clienteAxios from "../config/clienteAxios";

const userContext = createContext();

export const useUser = () => {
  const context = useContext(userContext);
  return context;
};

export const UserProvaider = ({ children }) => {
  const navigate = useNavigate();
  
  const [allProyectByUser,setAllProyectByUser]=useState([]);
  const [allusers,setAllUsers]=useState([])
  const [perfil, setPerfil] = useState({});
  //creo este estado asi, una ves registrodo lo redirecciono al login y cargo los datos sel usuario sin volver a solicitarlos
  const [userEmailForLogin, setUserEmailForLogin] = useState("");
  
  const [cargando, setCargando] = useState(true);
  
  const [auth, setAuth] = useState({});


  const listAllUsers=async(token)=>{
      try {
        const {data}= await listAllUsersAPI(token)
        console.log("lisAllusers",data,auth.id);
        const userFilter = await data.filter(user=> user.id !== auth.id)
        console.log("lisAllusers filtrado",userFilter,auth.id);
        setAllUsers(userFilter)
        
      } catch (error) {
        console.log("error en el context", error);
      }
  }

  const allPoryectByUserContext= async() => {

    const token = localStorage.getItem('token');
    if(!token) {
      return;
    }
    try {
      const data = await allPoryectByUserAPI(auth.id,token)
      setAllProyectByUser(data)
      
    } catch (error) {
        console.log("error en el contex de usuario allPoryectByUserContext",error);
    }                                          
  }

  useEffect(() => {
    allPoryectByUserContext();
    const token = localStorage.getItem('token');
    if(!token) {
      return;
    }
    listAllUsers(token)
    
    
  }, [auth,navigate]);

  const loginContext = async (user) => {
      try {
        const rta = await loginAPI(user);
        if (rta.status === 200) {
          console.log("🔥😎🔥😎🔥😎" ,rta);
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

      const resWithToken = {...res,token}
      //console.log("😪😪😪😪",resWithToken);
      setAuth(resWithToken);
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


  const cerrarSesionAuth = () => {
    setAuth({});
  }

  const cerrarSesionProyectos = () => {
    setAllProyectByUser([]);
  }

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
<<<<<<< HEAD
        obtenerPerfil,
        allusers,
        setAllUsers
=======
        obtenerPerfil, 
        setAllProyectByUser,
        cerrarSesionAuth,
        cerrarSesionProyectos
>>>>>>> 7a4a9a0dc500ae248310b7960e496802a3b88dca
      }}>
      {children}
    </userContext.Provider>
  )
}
