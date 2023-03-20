import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { formatearFecha } from '../helpers/formaterFecha';
import {useUser} from './../context/UserContext'
const TrabajoVista = ({proyect}) => {

 
  const {auth}= useUser()
  return (
    <div className='bg-white p-4 flex flex-col items-center mb-5 rounded-md shadow-md w-full sm:w-11/12 sm:justify-between gap-2 sm:flex-row sm:gap-0'>
        <div>
            <h1 className='uppercase font-black font-inter text-xl text-[#1D3557]'>   {proyect.name}  {
              auth.id == proyect.createUser ? <span className="inline-block text-white ml-2 whitespace-nowrap rounded-[0.27rem] bg-green-500 px-[0.65em] pt-[0.35em] pb-[0.25em] text-center align-baseline text-[0.75em] font-bold leading-none text-secondary-800">
              Administrador
            </span> :
            <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-cyan-500 px-[0.65em] pt-[0.35em] pb-[0.25em] text-center align-baseline text-[0.75em] font-bold leading-none text-secondary-800">
            Colaborador
          </span>

            }    
            </h1>
            <p className='uppercase font-black font-inter text-md text-[#1D3557]'>Para: <span className='text-[#969393]'>{proyect.customer}</span></p>
            <p className='uppercase font-black font-inter text-md text-[#1D3557]' >Fechad de entrega: <span className='text-[#969393]'>{formatearFecha(proyect.dateEnd)}</span></p>
        </div>
        <Link to={`/trabajos/${proyect.id}`}  className='bg-fondo p-2 text-center cursor-pointer text-white rounded-md uppercase font-mont font-normal'>Ver Proyecto</Link>
    </div>
  )
}

export default TrabajoVista