import React from 'react';
import { Link, NavLink ,useNavigate} from 'react-router-dom';
import { useProyect } from '../context/ProyectContext';
import {useUser} from './../context/UserContext'
import {RiBookletLine,RiContactsLine,RiDraftLine,RiLogoutBoxLine} from "react-icons/ri";
const Sidebar = ({setMostrarMenu}) => {
  const {auth, cerrarSesionAuth, cerrarSesionProyectos,cargando,setCargando}=useUser();
  const {resetearProyectoActual} = useProyect();
  const navigate = useNavigate()
  
  const handleLogout = () => {
   setCargando(false)
    cerrarSesionAuth();
    cerrarSesionProyectos();
    resetearProyectoActual();
    localStorage.removeItem('token')
    navigate('/')
    
  }


  return (
    <div className='flex flex-col items-center w-full'>
        <h1 className='text-5xl font-bold mb-14 md:text-4xl lg:text-5xl font-mont'>TuTarea</h1>
        <p className='text-2xl font-semibold text-center'>¡Hola {auth.name}!</p>
        <nav className='mt-7 flex flex-col items-left'>
                <NavLink onClick={() => setMostrarMenu(false)} to={"/trabajos"} className="nav-item"><RiBookletLine/>Proyectos</NavLink>
                <NavLink onClick={() => setMostrarMenu(false)}  to={"/trabajos/perfil"} className="nav-item"><RiContactsLine/>Perfil</NavLink>
                <NavLink onClick={() => setMostrarMenu(false)} to={"/trabajos/nuevo-trabajo"} className="nav-item"><RiDraftLine/>Nuevo Proyecto</NavLink>
        </nav>
        <div className='flex-1 flex flex-col items-center justify-end gap-10 pb-4'>
            <button className='font-semibold text-xl flex items-center gap-2 font-mont' onClick={handleLogout}><RiLogoutBoxLine/>Cerrar Sesión</button>
            <h1 className='text-4xl font-bold text-[#C9C9C9] font-mont'>TuTarea</h1>
        </div>
    </div>
  )
}

export default Sidebar