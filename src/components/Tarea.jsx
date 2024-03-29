import React, { useEffect, useState } from 'react'
import {useTask} from './../context/TaskContext'
import {useUser} from './../context/UserContext'
import Swal from "sweetalert2";
import { useProyect } from '../context/ProyectContext';
import { formatearFecha } from '../helpers/formaterFecha';
import ModalTarea from './ModalTarea';

const Tarea = ({t}) => {
  const {exchengeStatusContext, deleteTaskContext}=useTask()
  const {auth}=useUser()
  const {proyect} = useProyect();
  const [openModal, setOpenModal] = useState(false);


  const exchangeStatus=async()=>{
  const token = localStorage.getItem('token');
  //console.log("vine pa aca");
  const res =  await exchengeStatusContext(t.id, token)
  if (res.status === 200) {
    Swal.fire({
      position: "center-center",
      icon: "success",
      title: `¡Tarea modificada por ${auth.name}!`,
      showConfirmButton: false,
      timer: 1500,
    });
   
  }
}

  const handleDelete = () => {
    Swal.fire({
      title: '¿Estas seguro de eliminar esta tarea?',
      text: "¡No podrás recuperarla!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteTaskContext(t.id)
        Swal.fire(
          'Eliminada!',
          '¡La tarea ha sido elimina!',
          'success'
        )
      }
    })
  }


  return (
    <div className='font-open mt-5 bg-white p-5 rounded-lg shadow-sm flex flex-col xl:flex-row'>
        <div>
            <h1 className='text-xl font-bold text-[#1D3557] uppercase mt-2'>{t.name}</h1>
            <p className='font-normal text-[#7A7C7D] font-inter mt-2'>{t.descripcion}</p>
            <p className='text-[#1D3557] mt-2 font-bold'>Completar antes de: <span className='text-[#7A7C7D] capitalize font-normal '>{formatearFecha(t.dateEnd)}</span></p>
            <p className='text-[#1D3557] font-bold mt-2'>Prioridad: <span className='text-[#7A7C7D] font-normal'>{t.priority}</span></p>
           {t.state && (<p className='text-[#ffffff] bg-[#59D674] text-center w-80 p-1 rounded-lg mt-2 font-bold uppercase'>Completado por: {t.userStatusChange.name}</p>)}
        </div>
        <div className='flex justify-center flex-wrap mt-3 xl:flex-col'>
            <button 
              className='w-40 m-2 h-8 text-white font-inter uppercase rounded-md bg-[#4361EE]'
              onClick={() => setOpenModal(true)}
              >Editar</button>
            {t.state === false ? (
              <button onClick={() => exchangeStatus()} key={1} className='w-40 m-2 h-8 text-white font-inter uppercase rounded-md bg-[#daa506]'>
                Incompleto
              </button>
            ) : (
              <button onClick={() => exchangeStatus()} key={2} className='w-40 m-2 h-8 text-white font-inter uppercase rounded-md bg-[#59D674]'>
                Completada
              </button>
            )}
            <button 
              className='w-40 m-2 h-8 text-white font-inter uppercase rounded-md bg-[#E63946]'
              onClick={handleDelete}
            >Eliminar</button>
        </div>
        <ModalTarea openModal={openModal} setOpenModal={setOpenModal} tarea={t}/>
    </div>
  )
}

export default Tarea