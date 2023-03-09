import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = ({setMostrarMenu}) => {
  return (
    <div className='flex flex-col items-center w-full'>
        <h1 className='text-5xl font-bold mb-14 md:text-4xl lg:text-5xl font-mont'>TuTarea</h1>
        <p className='text-2xl font-semibold text-center'>¡Hola Fabio!</p>
        <nav className='mt-7 flex flex-col items-left'>
                <NavLink onClick={() => setMostrarMenu(false)} to={"/trabajos"} className="nav-item"><img src='../../src/assets/book-solid-24.png'/>Trabajos</NavLink>
                <NavLink onClick={() => setMostrarMenu(false)}  to={"/trabajos/perfil"} className="nav-item"><img src='../../src/assets/user-solid-24.png'/>Perfil</NavLink>
                <NavLink onClick={() => setMostrarMenu(false)} to={"/trabajos/nuevo-trabajo"} className="nav-item"><img src='../../src/assets/add.png'/>Nuevo Trabajo</NavLink>
        </nav>
        <div className='flex-1 flex flex-col items-center justify-end gap-10 pb-4'>
            <button className='font-semibold text-xl flex items-center gap-2 font-mont'><img src='../../src/assets/exit-solid-24.png'/>Cerrar Sesión</button>
            <h1 className='text-4xl font-bold text-[#C9C9C9] font-mont'>TuTarea</h1>
        </div>
    </div>
  )
}

export default Sidebar