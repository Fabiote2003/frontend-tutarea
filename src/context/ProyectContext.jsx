import React,{createContext,useContext,useState} from 'react'
import {createProyectAPI,listOneProyectAPI,addCollaboratorAPI,deleteCollaboratorAPI} from './../apiReq/proyectAPI'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios from '../config/clienteAxios'

import { useUser } from './UserContext'
const proyectContext = createContext()

export const useProyect =()=>{
    const context = useContext(proyectContext)
    return context
} 

export const ProyectProvaider =({children})=>{
    const {setAllProyectByUser, allProyectByUser,setCargando} = useUser();
   // console.log(allProyectByUser)

  const [proyect, setProyect] = useState({})
  const [taskDue,setTaskDue] = useState([])
  
  const [buscador, setBuscador] = useState(false);
  const navigate = useNavigate();

    const deleteCollaboratorContext=async(idProyect,token,idUser)=>{
        setCargando(true)
        try {
            //console.log("en el context", idProyect,token,idUser);
            const rta = await deleteCollaboratorAPI(idProyect,token,idUser)
            await obtenerProyecto(idProyect)
            setCargando(false)
            return rta
        } catch (error) {
            console.log("error en context 😡", error.message);
            
        }
    }

  const addCollaboratorContext=async(idProyect,token,idUser)=>{
    setCargando(true)
        try {
            const rta = await addCollaboratorAPI(idProyect,token,idUser)
            await obtenerProyecto(idProyect)
            setCargando(false)
            return rta
        } catch (error) {
            console.log("error en context 😡", error.message);
            
        }
  }

  
  
  
    const obtenerProyecto = async (id) => {
    setCargando(true)
    const token = localStorage.getItem('token');
    if(!token) {
        setCargando(false);
        return;
    }

    try {
        const res = await  listOneProyectAPI(id, token);
        //console.log("😎😎😎",res);
        // if (res.taskDue) {
        //     setTaskDue(res.taskDue)
        // }
        // console.log("TASK DUEEEE",taskDue);    
        setProyect(res.data)
        setCargando(false)
    } catch(error) {
        console.log('Error en obtener proyecto: ', error);
    }

    setCargando(false);
  }

const createProyectContext=async(proyect,token)=>{
        setCargando(true)
        try {
            const rta = await createProyectAPI(proyect,token)
            setCargando(false)
            return rta
        } catch (error) {
            console.log("ERRRO en el createProyectContext catch",error);
        }
}
// const listOneProyectContext=async(id,token)=>{
//     try {
//         const rta = await listOneProyectAPI(id,token)
//         return rta
        
//     } catch (error) {
//         console.log("ERRRO en el listOneProyectContext catch",error);
//     }
// }


const editarProyecto = async (id, proyectoActualizadoDatos, token) => {
    setCargando(true)
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const {data} = await clienteAxios.patch(`/proyecto/${id}`, proyectoActualizadoDatos, config);
        setProyect({
            ...proyect,
            ...data.data
        })
        setCargando(false)
    navigate(-1)
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El proyecto ha sido editado',
        showConfirmButton: false,
        timer: 1500
    })


    } catch (error) {
        console.log(error);
    }
} 

const eliminarProyecto = async (id) => {
    setCargando(true)
    const token = localStorage.getItem('token');
    if(!token) {
        return;
    }

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const {data} = await clienteAxios.delete(`/proyecto/${id}`, config);
        //console.log("log de data🤐🤐🤐",data);
        const proyectosActualizados = [...allProyectByUser];
        proyectosActualizados.filter(proyectoState => proyectoState.id !== id);
        setAllProyectByUser(proyectosActualizados);
        setCargando(false)
    } catch (error) {
        console.log(error);
    }
}

    const resetearProyectoActual = ( ) => {
        
        setProyect({});
        
    }

    const handleBuscador = () => {
        setBuscador(!buscador);
    }

    return (
       <proyectContext.Provider value={{
        createProyectContext,
        // listOneProyectContext,
        obtenerProyecto,
        proyect,
        setProyect,
        addCollaboratorContext,
        deleteCollaboratorContext,
        editarProyecto,
        eliminarProyecto,
        resetearProyectoActual,
        handleBuscador,
        taskDue,
        buscador
       }}>
        {children}
       </proyectContext.Provider> 
    )
}