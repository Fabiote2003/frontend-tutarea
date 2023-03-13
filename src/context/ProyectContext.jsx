import React,{createContext,useContext,useState} from 'react'
import {createProyectAPI,listOneProyectAPI} from './../apiReq/proyectAPI'
const proyectContext = createContext()

export const useProyect =()=>{
    const context = useContext(proyectContext)
    return context
} 

export const ProyectProvaider =({children})=>{

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
        listOneProyectContext
        
       }}>
        {children}
       </proyectContext.Provider> 
    )
}