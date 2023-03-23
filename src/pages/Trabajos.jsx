import React from 'react'
import Busqueda from '../components/Busqueda'
import TrabajoVista from '../components/TrabajoVista'
import { useProyect } from '../context/ProyectContext'
import {useUser} from './../context/UserContext'

const Trabajos = () => {
  const {allProyectByUser} = useUser()
  const {handleBuscador} = useProyect();

  return (
    <div className='w-full '>
      <div className='flex flex-col justify-center sm:flex-row sm:justify-between sm:items-center'>
        <h1 className='text-3xl text-center uppercase font-bold font-mont sm:text-4xl'>Proyectos</h1>
        <button onClick={handleBuscador} className='mt-3 sm:mt-0 p-3 bg-fondo text-white rounded-md  text-md uppercase font-mont font-semibold hover:bg-zinc-900 flex gap-2 justify-center'><img src="../../src/assets/search.png"/>Buscar Trabajo</button>
      </div>
      <div className='mt-7 sm:mt-10'>
        {allProyectByUser.length > 0 ? allProyectByUser.map(proyect => <TrabajoVista key={proyect.id} proyect={proyect}/>):"aun no tiene proyectos asignados"}
      </div>
      <Busqueda />
    </div>
  )
}

export default Trabajos