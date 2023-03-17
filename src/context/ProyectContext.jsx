import React,{createContext,useContext,useState} from 'react'
import {createProyectAPI,listOneProyectAPI} from './../apiReq/proyectAPI'
const proyectContext = createContext()

export const useProyect =()=>{
    const context = useContext(proyectContext)
    return context
} 

export const ProyectProvaider =({children})=>{

  const [proyect, setProyect] = useState({})
  const [cargando, setCargando] = useState(false);

  const obtenerProyecto = async (id) => {
    setCargando(true)
    const token = localStorage.getItem('token');
    if(!token) {
        setCargando(false);
        return;
    }

    try {
        const res = await  listOneProyectAPI(id, token);
        setProyect(res.data)
    } catch(error) {
        console.log('Error en obtener proyecto: ', error);
    }

    setCargando(false);
  }

const createProyectContext=async(proyect,token)=>{
        
        try {
            const rta = await createProyectAPI(proyect,token)
            
            return rta
        } catch (error) {
            console.log("ERRRO en el createProyectContext catch",error);
        }
}
const listOneProyectContext=async(id,token)=>{
    try {
        const rta = await listOneProyectAPI(id,token)
        return rta
        
    } catch (error) {
        console.log("ERRRO en el listOneProyectContext catch",error);
    }
}


    return (
       <proyectContext.Provider value={{
        createProyectContext,
        listOneProyectContext,
        obtenerProyecto,
        proyect,
        setProyect
       }}>
        {children}
       </proyectContext.Provider> 
    )
}