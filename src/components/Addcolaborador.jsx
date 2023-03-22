import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {useNavigate} from 'react-router-dom'
import {useUser} from './../context/UserContext'
import {useProyect} from './../context/ProyectContext'

import Swal from "sweetalert2";



export const Addcolaborador = ({idProyect}) => {
  
  
    const [addIdUser,setAddIdUser]=useState({collaborator:""})

    const {allusers}=useUser()
    const {addCollaboratorContext} = useProyect()


    const successAddCollaborator=()=>{
        Swal.fire({
            position: "center",
            icon: "success",
            title: "¡Colaborador Agregado!",
            showConfirmButton: false,
            timer: 1500,
          });
         
         
    }
    const errorAddCollaborator=(rta)=>{
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${rta}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }



  return (
    <div>
        <Formik
            initialValues={addIdUser}
            validationSchema={
                Yup.object({
                    collaborator: Yup.string().required(
                        "debes seleccionar un Collaborador de entraga para esta tarea"
                      ),
                })
            }
            onSubmit={async (values) => {
                      
                const tokenUser = localStorage.getItem('token')
                try {
                    console.log("datos para agreagar un colaborador",idProyect,tokenUser,values);
                    const rta = await addCollaboratorContext(idProyect,tokenUser,values)
                 if(rta.status === 200){

                   successAddCollaborator()
                 }else{
                  errorAddCollaborator(rta)
                 }
                 
                    
                } catch (error) {
                    console.log("Error en el front 👽👽👽", error.message);
                }
               
            }}
              
              enableReinitialize={true}
        >
            {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} >
            <div className="mb-5">
                          <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="prioridad"
                          >
                            Agregar Colaborador
                          </label>
                          <Field as="select" 
                          className="border-2 w-full mt-2 p-2 rounded-md placeholder-gray-400"
                          placeholder="Prioridad de la tarea"
                          name="collaborator">
                            <option value="">Colaboradores</option>
                            {allusers?.map(user=> <option key={user.id} value={user.id}>{user.name}</option>)}
                            
                           
                          </Field>
                         
                         
                          <ErrorMessage
                            component="p"
                            className="text-red-500 text-[12px] font-bold uppercase font-mont"
                            name="collaborator"
                          />
                        </div>
                        <button
                          type="submit"
                          className="p-3 w-full mb-3 bg-fondo font-inter hover:bg-zinc-900 text-white uppercase font-bold text-center cursor-pointer transition-colors rounded"
                        >
                         Agregar colaborador
                        </button>
            </Form>
              )}
        </Formik>
        
    </div>
  )
}
