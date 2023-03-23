import React,{createContext,useContext,useState} from 'react'
<<<<<<< HEAD
import {createProyectAPI,listOneProyectAPI,addCollaboratorAPI,deleteCollaboratorAPI} from './../apiReq/proyectAPI'
=======
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios from '../config/clienteAxios'
import {createProyectAPI,listOneProyectAPI} from './../apiReq/proyectAPI'
import { useUser } from './UserContext'
>>>>>>> 7a4a9a0dc500ae248310b7960e496802a3b88dca
const proyectContext = createContext()

export const useProyect =()=>{
    const context = useContext(proyectContext)
    return context
} 

export const ProyectProvaider =({children})=>{

  const [proyect, setProyect] = useState({})
  const [cargando, setCargando] = useState(false);
  const [buscador, setBuscador] = useState(false);
  const navigate = useNavigate();

<<<<<<< HEAD
    const deleteCollaboratorContext=async(idProyect,token,idUser)=>{
        try {
            console.log("en el context", idProyect,token,idUser);
            const rta = await deleteCollaboratorAPI(idProyect,token,idUser)
            return rta
        } catch (error) {
            console.log("error en context 😡", error.message);
            
        }
    }

  const addCollaboratorContext=async(idProyect,token,idUser)=>{
        try {
            const rta = await addCollaboratorAPI(idProyect,token,idUser)
            return rta
        } catch (error) {
            console.log("error en context 😡", error.message);
            
        }
  }

=======
  const {setAllProyectByUser, allProyectByUser} = useUser();
    console.log(allProyectByUser)
>>>>>>> 7a4a9a0dc500ae248310b7960e496802a3b88dca
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


const editarProyecto = async (id, proyectoActualizadoDatos, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const {data} = await clienteAxios.patch(`/proyecto/${id}`, proyectoActualizadoDatos, config);
        setProyect({
            ...proyect,
            ...data.data
        })

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

    const token = localStorage.getItem('token');
    if(!token) {
        return;
    }

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const {data} = await clienteAxios.delete(`/proyecto/${id}`, config);
        const proyectosActualizados = [...allProyectByUser];
        proyectosActualizados.filter(proyectoState => proyectoState.id !== id);
        setAllProyectByUser(proyectosActualizados);

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
        listOneProyectContext,
        obtenerProyecto,
        proyect,
        setProyect,
<<<<<<< HEAD
        addCollaboratorContext,
        deleteCollaboratorContext
=======
        editarProyecto,
        eliminarProyecto,
        resetearProyectoActual,
        handleBuscador,
        buscador
>>>>>>> 7a4a9a0dc500ae248310b7960e496802a3b88dca
       }}>
        {children}
       </proyectContext.Provider> 
    )
}