import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useUser } from '../context/UserContext';
const PrivateRoute = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const {auth, cargando} = useUser();
  console.log(auth)
  if(cargando) return "Cargando..."

  return (
    <>
      {auth.id ? (
        <main className='w-full min-h-screen bg-fondo flex flex-col md:flex-row gap-3 max-h-screen'>
        <header className='md:hidden flex justify-between items-center p-5 bg-fondo text-white flex-initial'>
          <h1 className='text-4xl'>TuTarea</h1>
          <img className='cursor-pointer' onClick={() => setMostrarMenu(!mostrarMenu)} src='../../src/assets/bx-menu (1).svg' width={40}/>
        </header>
          
        <aside className={`${mostrarMenu ? 'activo' : ''} sidebar`}>
            <Sidebar setMostrarMenu={setMostrarMenu} />
        </aside>
        
        <section className='bg-[#F1FAEE] md:rounded-3xl md:my-5 md:mr-5 w-full p-5 flex-1 max-h-screen overflow-y-scroll'>
          <Outlet  />  
        </section>
    </main>
      ) : 
        <Navigate to="/" />
      }
    </>
    
  ) 
}

export default PrivateRoute;