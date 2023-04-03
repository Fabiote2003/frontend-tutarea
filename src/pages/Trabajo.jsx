import React, { useEffect, useState } from 'react'
import Progress from '../components/Progress'
import Tarea from '../components/Tarea';
import Colaborador from '../components/Colaborador';
import {Addcolaborador} from '../components/Addcolaborador'
import ModalTarea from '../components/ModalTarea'
import { Link, useParams } from 'react-router-dom';
import {useProyect} from './../context/ProyectContext'
import {useUser} from './../context/UserContext'  
import { formatearFecha } from '../helpers/formaterFecha';
import Swal from "sweetalert2";
import {Spinner} from './../components/Spinner'

const Trabajo = () => {
  const {obtenerProyecto, proyect} = useProyect();
  
  const params = useParams()
  
  const [openModal, setOpenModal] = useState(false);
  
  const {auth,cargando}=useUser()
  
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect( () => {
    const obtenerProyectoParaTareas = async () => {
      await obtenerProyecto(params.id);
    }
    obtenerProyectoParaTareas();
  }, [params.id, openModal])

  // console.log("obtener proyecto---😪😪😪😪",obtenerProyecto);
  // console.log("Proyect---",proyect);
  let contadorTareasCompletadas;
  useEffect(() => {
      contadorTareasCompletadas = 0;
      if(Object.keys(proyect).length > 0) {
        proyect.task.forEach(tarea => {
          if(tarea.state) {
            return contadorTareasCompletadas++;
          }
        })
        setPorcentaje((contadorTareasCompletadas * 100) / proyect.task.length);
        //console.log(porcentaje)
        
      }
  }, [proyect])
 
    
 
 useEffect(()=>{
   // console.log("proyect desde useefect", proyect);
 },[proyect])

 
  
  return (
    <>{cargando ? <Spinner/>:
    <div>
        <div className='flex flex-col items-center lg:flex-row lg:justify-between mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold font-inter text-fondo'>TRABAJO:{proyect.name} </h1>
          <Link 
          to={`/trabajos/editar-trabajo/${proyect.id}`}
          className='flex items-center gap-2 bg-fondo text-white uppercase text-center font-mont font-semibold p-2 mt-3 sm:mt-0 rounded-md'><img src='../src/assets/edit-alt-solid-24.png' className='md:w-10 md:h-10 lg:w-8 lg:h-8'/>Editar Trabajo</Link>  
        </div>
        <p className='font-mont font-bold mt-3 text-fondo'>Descripción: <span className='font-semibold text-[#777777]'>{proyect.description}</span></p>
        <p className='uppercase text-xl text-center text-[#003049] font-black mt-3 font-inter'>Entregar antes del {formatearFecha(proyect.dateEnd)}</p>
        <div className='flex flex-col mt-5 xl:flex-row w-full'>
            <div className='flex flex-col items-center p-5 lg:w-4/6'>
                <h1 className='text-3xl md:text-4xl font-extrabold text-left font-mont text-fondo mb-4'>Tareas</h1>
                <ModalTarea openModal={openModal} setOpenModal={setOpenModal} idProyect={proyect.id} idUser={auth.id} dateEndProyect={proyect.dateEnd}/> 
                <Progress done={proyect.task?.length > 0 ? (porcentaje.toFixed(2)) : new Number(0).toFixed(2)}/>
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
                                          : <span className='uppercase p-2 font-semibold text-md font-mont'>no hay tareas asociadas al proyecto aún</span>}
             
               
            </div>
            <div className='p-2 flex flex-col w-full sm:w-10/12 mx-auto lg:w-2/6' id='integrantes'>
                <h1 className='text-3xl md:text-4xl font-extrabold text-left font-mont text-fondo mb-4 md:text-center'>Integrantes</h1>
                <Addcolaborador idProyect={proyect.id}/>
                {
                  proyect.collaborator?.length > 0 ? proyect.collaborator.map(c=>  <Colaborador c={c} idProyect={proyect.id} key={c.id} />)
                  : <span>aun no hay colaboradores en este proyecto al proyecto</span>
                }
                
              
            </div>
        </div>
    </div>
    }</>
  )
}

export default Trabajo