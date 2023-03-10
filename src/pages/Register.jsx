import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik"; //, ErrorMessage
import * as Yup from "yup";

import { useUser } from "./../context/UserContext";

import Swal from "sweetalert2";

const Register = () => {
  const { registerContext } = useUser();

  const navigate = useNavigate();

  const userSuccesRegister=async ()=>{
    Swal.fire({
      position: "center-center",
      icon: "success",
      title: "¡Usuario Registrado exitosamente!",
      showConfirmButton: false,
      timer: 2500,
    });
    navigate("/")
  } 
 
  return (
    <div className="flex font-mont">
      <div className="bg-[#A8DADC] w-1/2 h-screen"></div>
      <div className="absolute w-4/5 h-5/6 md:h-4/5 lg:h-3/4 left-0 right-0 top-0 bottom-0 m-auto flex flex-col md:flex-row shadow-xl">
        <div className="w-1/2 hidden md:flex flex-col items-center justify-center bg-[#F8FBFF] rounded-l-2xl p-10 gap-8">
          <h1 className="text-5xl font-sans font-extrabold text-[#2C4D7A] text-center">
            ¡Administra tus trabajos con nosotros!
          </h1>
          <img src="../../src/assets/personas-estudiando.svg" />
        </div>

        <div className="w-full md:w-1/2 h-full rounded-2xl  md:rounded-l-none bg-[#E7E5FB] md:rounded-r-2xl pl-10 pr-10 pt-5 pb-5	flex flex-col items-center justify-center">
          <h1 className="text-3xl xl:text-4xl font-sans font-extrabold text-center text-[#2C4D7A]">
            Bienvenido a TuTarea
          </h1>

          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={Yup.object({
              name: Yup.string()
                .required("el nombre es requerido")
                .min(3, "el nombre debe contener como minimo 3 caracteres")
                .max(90, "el nombre debe contener un maximo de 90 caracteres"),
              email: Yup.string()
                .email("debe ser un tipo de email valido")
                .required("el campo es requerido"),
              password: Yup.string()
                .required("el campo es requerido")
                .min(6, "debe contener al menos 6 caracteres")
                .max(15, "no debe super un maximo de 15 caracteres"),
              confirmarPassword: Yup.string()
                .oneOf(
                  [Yup.ref("password"), null],
                  "Las contraseñas no coinciden"
                )
                .required("Por favor confirma tu contraseña"),
            })}
            onSubmit={async (values) => {
              try {
                const rta = await registerContext(values);
                if (rta) {
                 await userSuccesRegister()
                 
                }
              } catch (error) {
                console.log(
                  "Eror en el onSubmit del componente Register",
                  error
                );
              }
            }}
            //esta funcio es de formik, y se utiliza para cargar los datos en el fomulario, es decir, formik carga inicialmete los datos vacios que se encuentran en el initialValue(),
            //luego cuando queremos editar y cargar con los datos que recogemos con el params, devemos recargar el formulario con los datos obtenido, enableReinitialize
            enableReinitialize={true}
          >
            {({ handleSubmit }) => (
              <Form
                className="flex flex-col items-center mt-1 w-full sm:w-4/5"
                onSubmit={handleSubmit}
              >
                <div className="mt-2 flex flex-col items-start w-full">
                  <label
                    htmlFor="name"
                    className="text-[#457B9D] uppercase text-md font-bold mb-1"
                  >
                    Nombre
                  </label>
                  <Field
                    className="w-full p-1 pl-3 rounded-lg"
                    component="input"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Ingresa tu nombre"
                  />
                  <ErrorMessage
                    component="p"
                    className="pt-1 text-red-500 text-sm font-semibold uppercase"
                    name="name"
                  />
                </div>

                <div className="mt-2 flex flex-col items-start w-full">
                  <label
                    htmlFor="email"
                    className="text-[#457B9D] uppercase text-md font-bold mb-1"
                  >
                    Email
                  </label>
                  <Field
                    componet="input"
                    type="text"
                    name="email"
                    id="email"
                    className="w-full p-1 pl-3 rounded-lg"
                    placeholder="Ingresa tu email"
                  />
                  <ErrorMessage
                    component="p"
                    className="pt-1 text-red-500 text-sm font-semibold uppercase"
                    name="email"
                  />
                </div>
                <div className="mt-2 flex flex-col items-start w-full">
                  <label
                    htmlFor="password"
                    className="text-[#457B9D] uppercase text-md font-bold mb-1"
                  >
                    Contraseña
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="w-full p-1 pl-3 rounded-lg"
                    placeholder="Ingresa tu password"
                  />
                  <ErrorMessage
                    component="p"
                    className="pt-1 text-red-500 text-sm font-semibold uppercase"
                    name="password"
                  />
                </div>
                <div className="mt-2 flex flex-col items-start w-full">
                  <label
                    htmlFor="confirmarPassword"
                    className="text-[#457B9D] uppercase text-md font-bold mb-1"
                  >
                    Confirmar Contraseña
                  </label>
                  <Field
                    type="password"
                    name="confirmarPassword"
                    id="confirmarPassword"
                    className="w-full p-1 pl-3 rounded-lg"
                    placeholder="Repita su contraseña"
                  />
                  <ErrorMessage
                    component="p"
                    className="pt-1 text-red-500 text-sm font-semibold uppercase"
                    name="confirmarPassword"
                  />
                </div>

                <button className="btn-submit" type="submit">
                  Registrarse
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-gray-800 font-bold uppercase mt-5 text-center">
            Ya tienes cuenta?{" "}
            <Link className="text-[#457B9D]" to={"/"}>
              Inicia sesión.
            </Link>
          </p>
        </div>
      </div>

      <div className="bg-[#2C4D7A] w-1/2"></div>
    </div>
  );
};

export default Register;
