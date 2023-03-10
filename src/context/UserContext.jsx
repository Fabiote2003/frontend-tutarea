import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../apiReq/userAPI";

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

  const loginContext = async (user) => {
    try {
      const rta = await loginAPI(user);
      if (rta.status === 200) {
        localStorage.setItem('token', rta.token);
        setUserLogued(rta);
        navigate("/trabajos")
        return true
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
        
      }
    } catch (error) {
      console.log("error de context usercontex catch error", error);
    }
  };

  return (
    <userContext.Provider
      value={{
        loginContext,
        registerContext,
        setUserEmailForLogin,
        userEmailForLogin,
      }}>
      {children}
    </userContext.Provider>
  )
}
