import React,{createContext,useContext,useState} from 'react'
import {createProyectAPI} from './../apiReq/proyectAPI'
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



    return (
       <proyectContext.Provider value={{
        createProyectContext
       }}>
        {children}
       </proyectContext.Provider> 
    )
}