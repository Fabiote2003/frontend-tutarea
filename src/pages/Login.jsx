import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik"; 
import {useUser} from './../context/UserContext'
const Login = () => {

const {loginContext}= useUser()


  return (
    <div className='flex font-mont'>
        <div className='bg-[#A8DADC] w-1/2 h-screen'>
            
        </div>
        <div className='absolute w-4/5 h-4/5 md:h-4/5 lg:h-3/4 left-0 right-0 top-0 bottom-0 m-auto flex flex-col md:flex-row shadow-xl'>

            <div className='w-full md:w-1/2 h-full rounded-2xl md:rounded-r-none bg-[#E7E5FB] md:rounded-l-2xl pl-10 pr-10 pt-5 pb-5	flex flex-col items-center'>
                <h1 className='text-5xl font-sans font-extrabold text-[#2C4D7A]'>TuTarea</h1>
                <Formik
                initialValues={{email:"",password:""}}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email("debe ser un tipo de email valido")
                    .required("el campo es requerido"),
                  password: Yup.string()
                    .required("el campo es requerido")
                    .min(6,"debe contener al menos 6 caracteres")
                    .max(15,"no debe super un maximo de 15 caracteres"),
                })}
                onSubmit={async(values)=>{
                  console.log(values)
                  const rta = await loginContext(values)
                  console.log("rta del componente LOGIN",rta);
                }}
                >
                  {({handleSubmit})=>(

                <Form onSubmit={handleSubmit} className='flex flex-col items-center mt-5 w-full sm:w-4/5'>
                    <h1 className='text-2xl font-extrabold text-[#1D3557] text-center'>¡Bienvenido de Nuevo!</h1>
                    <div className='mt-7 flex flex-col items-start w-full'>
                      <label htmlFor="email" className='text-[#457B9D] uppercase text-md font-bold mb-1'>Email</label>
                      <Field  
                        className='w-full p-1 rounded-lg'
                        component="input"
                        name="email" 
                        type="name"
                        id='email' 
                      />
                       <ErrorMessage
                         component="p"
                         className="text-red-600 text-sm"
                         name="email"
                  />
                    </div>
                    <div className='mt-2 flex flex-col items-start w-full'>
                      <label htmlFor="email" className='text-[#457B9D] uppercase text-md font-bold mb-1'>Contraseña</label>
                      <Field 
                         className='w-full p-1 rounded-lg'
                         type="password" 
                         id='password' 
                         name="password"
                         />
                      <ErrorMessage
                         component="p"
                         className="text-red-600 text-sm"
                         name="password"
                  />
                    </div>

                    <button className='btn-submit px-4'>Login </button>
                </Form>
                  )
                  }

                </Formik>
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