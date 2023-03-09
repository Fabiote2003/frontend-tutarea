import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='flex font-mont'>
        <div className='bg-[#A8DADC] w-1/2 h-screen'>
            
        </div>
        <div className='absolute w-4/5 h-4/5 md:h-4/5 lg:h-3/4 left-0 right-0 top-0 bottom-0 m-auto flex flex-col md:flex-row shadow-xl'>

            <div className='w-full md:w-1/2 h-full rounded-2xl md:rounded-r-none bg-[#E7E5FB] md:rounded-l-2xl pl-10 pr-10 pt-5 pb-5	flex flex-col items-center'>
                <h1 className='text-5xl font-sans font-extrabold text-[#2C4D7A]'>TuTarea</h1>
                <form className='flex flex-col items-center mt-5 w-full sm:w-4/5'>
                    <h1 className='text-2xl font-extrabold text-[#1D3557] text-center'>¡Bienvenido de Nuevo!</h1>
                    <div className='mt-7 flex flex-col items-start w-full'>
                      <label htmlFor="email" className='text-[#457B9D] uppercase text-md font-bold mb-1'>Email</label>
                      <input type="email" id='email' className='w-full p-1 rounded-lg'/>
                    </div>
                    <div className='mt-2 flex flex-col items-start w-full'>
                      <label htmlFor="email" className='text-[#457B9D] uppercase text-md font-bold mb-1'>Contraseña</label>
                      <input type="email" id='email' className='w-full p-1 rounded-lg'/>
                    </div>

                    <input className='btn-submit' value="Ingresar" />
                </form>
                <p className='text-gray-800 font-bold uppercase mt-5 text-center'>¿No tienes cuenta? <Link className='text-[#457B9D]' to={"/registro  "}>Registrate</Link>.</p>
            </div>

            <div className='w-1/2 hidden md:flex flex-col items-center justify-center bg-[#F8FBFF] rounded-r-2xl p-10 gap-8'>
                <h1 className='text-5xl font-sans font-extrabold text-[#2C4D7A] text-center'>¡Administra tus trabajos con nosotros!</h1>
                <img src='../../src/assets/personas-estudiando.svg'/>
            </div>
        </div>

        <div className='bg-[#2C4D7A] w-1/2'>

        </div>
    </div>
  )
}

export default Login