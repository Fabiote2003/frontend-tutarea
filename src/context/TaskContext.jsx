import React, { createContext, useContext } from "react";

import clienteAxios from "../config/clienteAxios";
import {createTaskAPI, exchengeStatusAPI} from './../apiReq/taskAPI'
import { useProyect } from "./ProyectContext";
import {useUser} from './UserContext'

const taskContext = createContext()

export const useTask =()=>{
    const context = useContext(taskContext)
    return context
}

export const TaskProvider =({children})=>{

    const {proyect, setProyect} = useProyect();
    const {setCargando} =useUser()
    
const creatTaskContext=async(idProyec,task,token)=>{
    setCargando(true)
    //console.log("😡😡😡",idProyec,task,token );
    try {
        const res = await createTaskAPI(idProyec,task,token)
        setCargando(false)
        return res
    } catch (error) {
        console.log("Error en createTaskConetext create",error);
    }
}

const updateTaskContext = async (usuarioActualizado, token) => {
   setCargando(true)
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {

        const {data} = await clienteAxios.patch(`/tarea/${usuarioActualizado.id}`, usuarioActualizado, config);
        const proyectoActualizado = {...proyect}
        proyectoActualizado.task = proyectoActualizado.task.map(tareaState => tareaState.id === data.data.id ? data.data : tareaState);
        setProyect(proyectoActualizado)
        setCargando(false)
    } catch (error) {
        console.log(error);
    }
}

const deleteTaskContext = async (id) => {
    setCargando(true)
    const token = localStorage.getItem('token');
    if(!token) {
        return;
    }

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const {data} = await clienteAxios.delete(`/tarea/${id}`, config);
        const proyectoActualizado = {...proyect};
        proyectoActualizado.task = proyectoActualizado.task.filter(tareaState => tareaState.id !== id);
        setProyect(proyectoActualizado);
        setCargando(false)
    } catch (error) {
        console.log(error);   
    }
}

const exchengeStatusContext=async(id,token)=>{
    setCargando(true)
    //console.log("que llega aca",id,token );
    try {
        const res = await exchengeStatusAPI(id,token);
       // console.log(res)
        const proyectoActualizado = {...proyect}
        proyectoActualizado.task = proyectoActualizado.task.map(tareaState => tareaState.id === res.data.id ? res.data : tareaState);
        setProyect(proyectoActualizado);
        setCargando(false)
        return res
    } catch (error) {
        
    }
}


    return(
        <taskContext.Provider 
        value={{
            creatTaskContext,
            exchengeStatusContext,
            updateTaskContext,
            deleteTaskContext
        }}>

            {children}
        </taskContext.Provider>

    )
}