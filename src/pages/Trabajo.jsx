import React, { useEffect, useState } from 'react'
import Progress from '../components/Progress'
import Tarea from '../components/Tarea';
import Colaborador from '../components/Colaborador';
import ModalTarea from '../components/ModalTarea'
import { Link, useParams } from 'react-router-dom';
import {useProyect} from './../context/ProyectContext'
import {useUser} from './../context/UserContext'  
import { formatearFecha } from '../helpers/formaterFecha';

const Trabajo = () => {
  const {obtenerProyecto, proyect, cargando} = useProyect();
  const params = useParams()
  const [openModal, setOpenModal] = useState(false);
  const {auth}=useUser()

  useEffect(() => {
    obtenerProyecto(params.id);
  }, [openModal])
  
  
  if(cargando) return 'Cargando...'
  
  return (
    <div>
        <div className='flex flex-col items-center lg:flex-row lg:justify-between mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold font-inter text-fondo'>TRABAJO:{proyect.name} </h1>
          <Link 
          className='flex items-center gap-2 bg-fondo text-white uppercase text-center font-mont font-semibold p-2 mt-3 sm:mt-0 rounded-md'><img src='../src/assets/edit-alt-solid-24.png' className='md:w-10 md:h-10 lg:w-8 lg:h-8'/>Editar Trabajo</Link>  
        </div>
        <p className='font-mont font-bold mt-3 text-fondo'>Descripción: <span className='font-semibold text-[#777777]'>{proyect.description}</span></p>
        <p className='uppercase text-xl text-center text-[#003049] font-black mt-3 font-inter'>entregar antes del {proyect.dateEnd}</p>
        <div className='flex flex-col mt-5 xl:flex-row w-full'>
            <div className='flex flex-col items-center p-5 lg:w-4/6'>
                <h1 className='text-3xl md:text-4xl font-extrabold text-left font-mont text-fondo mb-4'>Tareas</h1>
                <ModalTarea openModal={openModal} setOpenModal={setOpenModal} idProyect={proyect.id} idUser={auth.id} tokenUser={auth.token}/> 
                <Progress done={50}/>
                { auth.id == proyect.createUser ? <button 
                  className='md:self-start py-2 px-3 bg-[#6BDBD4] rounded-md uppercase font-inter font-bold text-white flex gap-2 mt-3'
                  onClick={() => setOpenModal(true)}
                  >
                  <img src='../../src/assets/plus.png'/>
                  Nueva tarea
                </button> : 
                null
                }
                <a href='#integrantes'
                  className='md:self-start lg:hidden py-2 px-3 bg-fondo rounded-md uppercase font-inter font-bold text-white flex gap-2 mt-3 cursor-pointer'
                  >
                  <img src='../../src/assets/down-arrow-circle-regular-24.png'/>
                  Ver Integrantes
                </a>
                {proyect.task?.length > 0 ? proyect.task.map(t=>  <Tarea t={t} key={t.id} />)
                                          : <span>aun no hay tareas asociadas al proyecto</span>}
             
               
            </div>
            <div className='p-2 flex flex-col w-full sm:w-10/12 mx-auto lg:w-2/6' id='integrantes'>
                <h1 className='text-3xl md:text-4xl font-extrabold text-left font-mont text-fondo mb-4 md:text-center'>Integrantes</h1>
                {
                  proyect.collaborator?.length > 0 ? proyect.collaborator.map(c=>  <Colaborador c={c} key={c.id} />)
                  : <span>aun no hay colaboradores en este proyecto al proyecto</span>
                }
                
              
            </div>
        </div>
    </div>
  )
}

export default Trabajo