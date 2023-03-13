import React, { useEffect } from 'react'
import { useUser } from "./../context/UserContext";
const Perfil = () => {
  const {auth} = useUser();
  
  

  return (
    <div className='p-10 flex bg-white rounded-xl shadow font-open'>
      <div className='w-full'>
        <h1 className='text-fondo text-2xl uppercase  font-black text-center mb-5'>Perfil de Usuario</h1>
        <h1 className='text-fondo uppercase font-bold text-lg'>Nombre: <span className='font-normal'>{auth.name}</span></h1>
        <h1 className='text-fondo uppercase font-bold text-lg'>Email: <span className='font-normal lowercase'>{auth.email}</span></h1>
      </div>  
    </div>
  )
}

export default Perfil