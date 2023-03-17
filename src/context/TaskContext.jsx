import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {createTaskAPI, exchengeStatusAPI} from './../apiReq/taskAPI'
import { useProyect } from "./ProyectContext";

const taskContext = createContext()

export const useTask =()=>{
    const context = useContext(taskContext)
    return context
}

export const TaskProvider =({children})=>{

    const {proyect, setProyect} = useProyect();
    
const creatTaskContext=async(idProyec,task,token)=>{
    console.log("😡😡😡",idProyec,task,token );
    try {
        const res = await createTaskAPI(idProyec,task,token)
        return res
    } catch (error) {
        console.log("Error en createTaskConetext create",error);
    }
}

const exchengeStatusContext=async(id,token)=>{
    console.log("que llega aca",id,token );
    try {
        const res = await exchengeStatusAPI(id,token);
        console.log(res)
        const proyectoActualizado = {...proyect}
        proyectoActualizado.task = proyectoActualizado.task.map(tareaState => tareaState.id === res.data.id ? res.data : tareaState);
        setProyect(proyectoActualizado);
        return res
    } catch (error) {
        
    }
}


    return(
        <taskContext.Provider 
        value={{
            creatTaskContext,
            exchengeStatusContext
        }}>

            {children}
        </taskContext.Provider>

    )
}