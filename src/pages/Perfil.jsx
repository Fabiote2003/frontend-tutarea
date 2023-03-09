import React from 'react'

const Perfil = () => {
  return (
    <div className='p-10 flex bg-white rounded-xl shadow font-open'>
      <div className='w-full'>
        <h1 className='text-fondo text-2xl uppercase  font-black text-center mb-5'>Perfil de Usuario</h1>
        <h1 className='text-fondo uppercase font-bold text-lg'>Nombre: <span className='font-normal'>Fabio Agustín Gomez Nasich</span></h1>
        <h1 className='text-fondo uppercase font-bold text-lg'>Email: <span className='font-normal lowercase'>fabiote2003@gmail.com</span></h1>
      </div>  
    </div>
  )
}

export default Perfil