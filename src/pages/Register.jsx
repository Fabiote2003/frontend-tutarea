import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import clienteAxios from '../config/clienteAxios';
import Swal from 'sweetalert2';

const Register = () => {
  const navigate = useNavigate();

  const [nuevoUsuario, setNuevoUsuario] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const [passwordValidation, setPasswordValidation] = useState('');

  const completarFormulario = (e) => {
    setNuevoUsuario({
      ...nuevoUsuario,
      [e.target.name]: e.target.value
    })
  }

  const crearUsuario = async (e) => {
    e.preventDefault();

    try {
      const {data} = await clienteAxios.post('/usuario/registrar', nuevoUsuario);
      console.log(data)
      Swal.fire({
        position: 'center-center',
        icon: 'success',
        title: '¡Usuario Registrado exitosamente!',
        showConfirmButton: false,
        timer: 1500
      })
      navigate('/');
    } catch (error) {

      let listaErrores;
      if (error) {
        listaErrores = error.response.data.message.map(message => message.msg);
      }
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Ocurrio un error al registrarse!',
        text: `${listaErrores}`,
      })
    }

  }

  return (
    <div className='flex font-mont'>
        <div className='bg-[#A8DADC] w-1/2 h-screen'>
            
        </div>
        <div className='absolute w-4/5 h-5/6 md:h-4/5 lg:h-3/4 left-0 right-0 top-0 bottom-0 m-auto flex flex-col md:flex-row shadow-xl'>
            
            <div className='w-1/2 hidden md:flex flex-col items-center justify-center bg-[#F8FBFF] rounded-l-2xl p-10 gap-8'>
                <h1 className='text-5xl font-sans font-extrabold text-[#2C4D7A] text-center'>¡Administra tus trabajos con nosotros!</h1>
                <img src='../../src/assets/personas-estudiando.svg'/>
            </div>

            <div className='w-full md:w-1/2 h-full rounded-2xl  md:rounded-l-none bg-[#E7E5FB] md:rounded-r-2xl pl-10 pr-10 pt-5 pb-5	flex flex-col items-center justify-center'>
                <h1 className='text-3xl xl:text-5xl font-sans font-extrabold text-center text-[#2C4D7A]'>Bienvenido a TuTarea</h1>
                <form 
                  className='flex flex-col items-center mt-1 w-full sm:w-4/5'
                  onSubmit={crearUsuario}
                  >
                    <div className='mt-2 flex flex-col items-start w-full'>
                      <label htmlFor="name" className='text-[#457B9D] uppercase text-md font-bold mb-1'>Nombre</label>
                      <input name='name' id='name' className='w-full p-1 pl-3 rounded-lg' placeholder='Ingresa tu nombre'
                        value={nuevoUsuario.nombre} onChange={completarFormulario}
                      />
                    </div>
                    
                    <div className='mt-2 flex flex-col items-start w-full'>
                      <label htmlFor="email" className='text-[#457B9D] uppercase text-md font-bold mb-1'>Email</label>
                      <input type="email" name='email' id='email' className='w-full p-1 pl-3 rounded-lg' placeholder='Ingresa tu nombre'
                        value={nuevoUsuario.email} onChange={completarFormulario}
                      />
                    </div>
                    <div className='mt-2 flex flex-col items-start w-full'>
                      <label htmlFor="password" className='text-[#457B9D] uppercase text-md font-bold mb-1'>Contraseña</label>
                      <input type="password" name="password" id='password' className='w-full p-1 pl-3 rounded-lg' placeholder='Ingresa tu nombre'
                         value={nuevoUsuario.password} onChange={completarFormulario}
                      />

                    </div>
                    <div className='mt-2 flex flex-col items-start w-full'>
                      <label htmlFor="confirmarPassword" className='text-[#457B9D] uppercase text-md font-bold mb-1'>Confirmar Contraseña</label>
                      <input type="password" id='confirmarPassword' className='w-full p-1 pl-3 rounded-lg' placeholder='Ingresa tu nombre' 
                      value={passwordValidation} 
                      onChange={(e) => setPasswordValidation(e.target.value)}
                      />
                    </div>

                    <input className='btn-submit' type="submit" value="Registrarse" />
                </form>
                <p className='text-gray-800 font-bold uppercase mt-5 text-center'>Ya tienes cuenta? <Link className='text-[#457B9D]' to={"/"}>Inicia sesión.</Link></p>
            </div>  

            
        </div>

        <div className='bg-[#2C4D7A] w-1/2'>

        </div>
    </div>
  )
}

export default Register