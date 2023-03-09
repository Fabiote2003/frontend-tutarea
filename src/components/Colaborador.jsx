import React from 'react'

const Colaborador = () => {
  return (
    <div className='bg-white p-4 flex flex-col gap-3 lg:gap-1 sm:flex-row md:justify-between items-center rounded-xl shadow mb-2'>
      <div className='text-center sm:text-left'>
        <p className='font-bold text-xl font-mont'>Rocio</p>
        <p className='text-md font-mont text-[#B4B4B4]'>rocio1999@gmail.com</p>
      </div>
      <button className='bg-[#E63946] py-1 px-3 text-white rounded-md font-bold w-2/3 sm:w-1/5 lg:w-2/5'>Eliminar</button>
    </div>
  )
}

export default Colaborador