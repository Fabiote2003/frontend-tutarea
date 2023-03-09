import React from 'react'

const Tarea = () => {
  return (
    <div className='font-open mt-5 bg-white p-5 rounded-lg shadow-sm flex flex-col xl:flex-row'>
        <div>
            <h1 className='text-xl font-bold text-[#1D3557] uppercase mt-2'>LLevar registro de clases.</h1>
            <p className='font-normal text-[#7A7C7D] font-inter mt-2'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo eos nemo ratione? Expedita maxime eveniet et enim. Accusantium, voluptates officia?</p>
            <p className='text-[#1D3557] mt-2 font-bold'>Completar antes de: <span className='text-[#7A7C7D] font-normal '>Entregar antes del Martes, 8 de agosto de 2023</span></p>
            <p className='text-[#1D3557] font-bold mt-2'>Prioridad: <span className='text-[#7A7C7D] font-normal'>Media</span></p>
        </div>
        <div className='flex justify-center flex-wrap mt-3 xl:flex-col'>
            <button className='w-40 m-2 h-8 text-white font-inter uppercase rounded-md bg-[#4361EE]'>Editar</button>
            <button className='w-40 m-2 h-8 text-white font-inter uppercase rounded-md bg-[#59D674]'>Completada</button>
            <button className='w-40 m-2 h-8 text-white font-inter uppercase rounded-md bg-[#E63946]'>Eliminar</button>
        </div>
    </div>
  )
}

export default Tarea