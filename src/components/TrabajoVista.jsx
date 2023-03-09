import React from 'react'
import { Link } from 'react-router-dom';

const TrabajoVista = () => {
  return (
    <div className='bg-white p-4 flex flex-col items-center mb-5 rounded-md shadow-md w-full sm:w-11/12 sm:justify-between gap-2 sm:flex-row sm:gap-0'>
        <div>
            <h1 className='uppercase font-black font-inter text-xl text-[#1D3557]'>Trabajo Práctico de POO</h1>
            <p className='uppercase font-black font-inter text-md text-[#1D3557]'>Para: <span className='text-[#969393]'>LABORATORIO DE POO.</span></p>
            <p className='uppercase font-black font-inter text-md text-[#1D3557]' >Fechad de entrega: <span className='text-[#969393]'>Martes, 8 de agosto de 2023.</span></p>
        </div>
        <Link className='bg-fondo p-2 text-center cursor-pointer text-white rounded-md uppercase font-mont font-normal'>Ver Proyecto</Link>
    </div>
  )
}

export default TrabajoVista