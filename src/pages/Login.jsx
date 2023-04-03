import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUser } from "./../context/UserContext";
import { RiEyeLine, RiEyeOffLine} from "react-icons/ri";
import {Spinner} from './../components/Spinner'

const Login = () => {
  
  const { loginContext, userEmailForLogin, auth ,cargando} = useUser();
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   console.log(auth);
  //   const redireccionarUsuario = () => {
  //       if(auth.id) {
  //         navigate("/trabajos")
  //         return;
  //       }
  //       console.log('No se ha logueado nadie')
  //   }
  //   redireccionarUsuario();
  // }, [auth, navigate]);

  const [showPass,setShowPass]= useState(false)
  
  const handelShowPassword=()=>{
    setShowPass(!showPass)
  }
  return (
    <>{ cargando ? <Spinner/> :
   
    <div className="flex font-mont">
      <div className="bg-[#A8DADC] w-1/2 h-screen"></div>
      <div className="absolute w-4/5 h-4/5 md:h-4/5 lg:h-3/4 left-0 right-0 top-0 bottom-0 m-auto flex flex-col md:flex-row shadow-xl">
        <div className="w-full md:w-1/2 h-full rounded-2xl md:rounded-r-none bg-[#E7E5FB] md:rounded-l-2xl pl-10 pr-10 pt-5 pb-5	flex flex-col items-center">
          <h1 className="text-5xl font-sans font-extrabold text-[#2C4D7A]">
            TuTarea
          </h1>
          <Formik
            initialValues={{ email: userEmailForLogin || "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("debe ser un tipo de email valido")
                .required("el email es requerido"),
              password: Yup.string()
                .required("la contraseña es requerida")
                .min(6, "debe contener al menos 6 caracteres")
                .max(15, "no debe super un maximo de 15 caracteres"),
            })}
            onSubmit={async (values) => {
              const rta = await loginContext(values);
            }}
            //esta funcio es de formik, y se utiliza para cargar los datos en el fomulario, es decir, formik carga inicialmete los datos vacios que se encuentran en el initialValue(),
            //luego cuando queremos editar y cargar con los datos que recogemos con el params, devemos recargar el formulario con los datos obtenido, enableReinitialize
            enableReinitialize={true}
          >
            {({ handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                className="flex flex-col items-center mt-5 w-full sm:w-4/5"
              >
                <h1 className="text-2xl font-extrabold text-[#1D3557] text-center">
                  ¡Bienvenido de Nuevo!
                </h1>
                <div className="mt-7 flex flex-col items-start w-full">
                  <label
                    htmlFor="email"
                    className="text-[#457B9D] uppercase text-md font-bold mb-1"
                  >
                    Email
                  </label>
                  <Field
                    className="w-full p-1 rounded-lg"
                    component="input"
                    name="email"
                    type="name"
                    id="email"
                    placeholder="Ingrese tu email"
                  />
                  <ErrorMessage
                    component="p"
                    className="pt-1 text-red-500 text-sm font-semibold uppercase"
                    name="email"
                  />
                </div>
                <div className=" mt-2 flex flex-col items-start w-full">
                  <label
                    htmlFor="email"
                    className="text-[#457B9D] uppercase text-md font-bold mb-1"
                  >
                    Contraseña
                  </label>
                  <div className="relative w-full">

                    <Field
                      className="w-full p-1 rounded-lg"
                      type={showPass ? "text":"password" }
                      id="password"
                      name="password"
                      placeholder="Ingrese su contraseña"
                      />
                    {showPass ? <RiEyeLine onClick={handelShowPassword} className='absolute right-2 botton-1 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer'/>
                              : <RiEyeOffLine onClick={handelShowPassword} className='absolute right-2 botton-1 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer'/>
                            }
                      </div>
                    <ErrorMessage
                      component="p"
                      className="pt-1 text-red-500 text-sm font-semibold uppercase"
                      name="password"
                      />
                </div>

                <button className="btn-submit px-4" type="submit">Login </button>
              </Form>
            )}
          </Formik>
          <p className="text-gray-800 font-bold uppercase mt-5 text-center">
            ¿No tienes cuenta?{" "}
            <Link className="text-[#457B9D]" to={"/registro  "}>
              Registrate
            </Link>
            .
          </p>
        </div>

        <div className="w-1/2 hidden md:flex flex-col items-center justify-center bg-[#F8FBFF] rounded-r-2xl p-10 gap-8">
          <h1 className="text-5xl font-sans font-extrabold text-[#2C4D7A] text-center">
            ¡Administra tus trabajos con nosotros!
          </h1>
          <img src="../../src/assets/personas-estudiando.svg" />
        </div>
      </div>

      <div className="bg-[#2C4D7A] w-1/2"></div>
    </div>
}</>
  );
};

export default Login;
