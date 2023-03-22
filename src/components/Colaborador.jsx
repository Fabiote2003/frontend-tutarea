import React from 'react'
import {RiDeleteBinLine} from "react-icons/ri"
import {useProyect} from './../context/ProyectContext'
import Swal from "sweetalert2";

const Colaborador = ({c,idProyect}) => {

const {deleteCollaboratorContext}=useProyect()
const deleteCollaborator=async()=>{
        try {
          const userId = {"id":c.id}
          const tokenUser = localStorage.getItem('token') 
          
          console.log("Datos para eliminar",idProyect,tokenUser,userId);
          const rta=await deleteCollaboratorContext(idProyect,tokenUser,userId)
          console.log("en el front ",rta);
          if (rta.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "¡Colaborador Eliminado!",
              showConfirmButton: false,
              timer: 1500,
            });
          }else{
            Swal.fire({
              position: "center",
              icon: "error",
              title: `${rta}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } catch (error) {
          
        }
}

  return (
    <div className='bg-white p-4 flex flex-col gap-3 lg:gap-1 sm:flex-row md:justify-between items-center rounded-xl shadow mb-2'>
      <div className='text-center sm:text-left'>
        <p className='font-bold text-xl font-mont'>{c.name}</p>
        <p className='text-md font-mont text-[#B4B4B4]'>{c.email}</p>
      </div>
      <button onClick={deleteCollaborator} className='bg-[#E63946] py-1 px-3 text-white rounded-md font-bold'><RiDeleteBinLine/></button>
    </div>
  )
}

export default Colaborador