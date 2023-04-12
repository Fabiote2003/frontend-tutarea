import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"; //, ErrorMessage
import * as Yup from "yup";
import Swal from "sweetalert2";

import {useUser} from './../context/UserContext'
import {useProyect} from './../context/ProyectContext'
import { useNavigate, useParams } from "react-router-dom";


const FormularioTrabajo = () => {

  const navigate = useNavigate();
  const {auth}=useUser()
  const {createProyectContext, proyect, editarProyecto}=useProyect();
  const params = useParams();
  const [proyectoFormulario, setProyectoFormulario] = useState({
      name: "",
      description: "",
      dateEnd: "",
      customer: "",
      createUser:auth.id 
    });
  
  useEffect(() => {
    if(params.id && proyect) {
      setProyectoFormulario({
        ...proyectoFormulario,
        name: proyect.name,
        description: proyect.description,
        dateEnd: proyect.dateEnd.split('T')[0],
        customer: proyect.customer
      })
    }
  
  }, [params])


  const proyectSuccesCreate=async (msg)=>{
    Swal.fire({
      position: "center",
      icon: "success",
      title: "¡Proyecto "+`"`+ msg+`"` +" se a creado  exitosamente!",
      showConfirmButton: false,
      timer: 3000,
    });
    setTimeout(() => {
      navigate("/trabajos")
    }, 500);
  } 


  

  return (
    <Formik
      initialValues={proyectoFormulario}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("el nombre es requerido")
          .min(3, "el nombre debe contener como minimo 3 caracteres")
          .max(90, "el nombre debe contener un maximo de 90 caracteres"),
        description: Yup.string()
          .required("el campo es requerido")
          .min(3, "el nombre debe contener como minimo 3 caracteres")
          .max(90, "el nombre debe contener un maximo de 90 caracteres"),
        dateEnd: Yup.date()
          .required("La fecha es obligatoria")
          .min(new Date(), "La fecha no puede ser menor que la fecha actual"),
        customer: Yup.string()
          .required("el nombre es requerido")
          .min(3, "el nombre debe contener como minimo 3 caracteres")
          .max(90, "el nombre debe contener un maximo de 90 caracteres"),
      })}
      onSubmit={async (values,{resetForm}) => {

        const token = localStorage.getItem('token')
        if(!token) {
          return;
        }

        if(params.id) {
            await editarProyecto(params.id, values, token);
           
           return;
        }


        const rta = await createProyectContext(values,token)
        if (rta.data.status === 200) {
          await proyectSuccesCreate(rta.data.data.name)
          resetForm({});
        }else {
          console.log("ERROR")
        }
      }}
      //esta funcio es de formik, y se utiliza para cargar los datos en el fomulario, es decir, formik carga inicialmete los datos vacios que se encuentran en el initialValue(),
      //luego cuando queremos editar y cargar con los datos que recogemos con el params, devemos recargar el formulario con los datos obtenido, enableReinitialize
      enableReinitialize={true}
    >
      {({ handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          className="bg-white w-full sm:w-4/6 mx-auto mt-2 md:mt-10 rounded-md p-5 shadow-md"
        >
          <div className="mb-2">
            <label
              htmlFor="nombre"
              className="text-fondo uppercase font-mont text-sm font-semibold"
            >
              Nombre
            </label>

            <Field
              type="text"
              id="nombre"
              name="name"
              placeholder="Ingrese el nombre del trabajo"
              className="placeholder:font-mont w-full mt-1 border rounded-sm placeholder:text-sm focus:outline-[#4D9C9C] p-1"
            />

            <ErrorMessage
              component="p"
              className="text-red-500 text-[12px] font-bold uppercase font-mont"
              name="name"
            />
           
          </div>
          <div className="mb-2">
            <label
              htmlFor="description"
              className="text-fondo uppercase font-mont text-sm font-semibold"
            >
              Descripción
            </label>
            <Field
              type="text"
              id="description"
              name="description"
              placeholder="Ingrese una descripción"
              className="placeholder:font-mont w-full mt-1 border rounded-sm placeholder:text-sm focus:outline-[#4D9C9C] p-1"
            />
            <ErrorMessage
              component="p"
              className="text-red-500 text-[12px] font-bold uppercase font-mont"
              name="description"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="fechaEntrega"
              className="text-fondo uppercase font-mont text-sm font-semibold"
            >
              Fecha de entrega
            </label>
            <Field
              type="date"
              name="dateEnd"
              id="fechaEntrega"
              placeholder="Ingrese el nombre del trabajo"
              className="placeholder:font-mont w-full mt-1 border rounded-sm placeholder:text-sm focus:outline-[#4D9C9C] p-1"
            />
            <ErrorMessage
              component="p"
              className="text-red-500 text-[12px] font-bold uppercase font-mont"
              name="dateEnd"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="materia"
              className="text-fondo uppercase font-mont text-sm font-semibold"
            >
              Nombre de la Materia
            </label>
            <Field
              type="text"
              name="customer"
              id="materia"
              placeholder="Ingrese nombre de la materia"
              className="placeholder:font-mont w-full mt-1 border rounded-sm placeholder:text-sm focus:outline-[#4D9C9C] p-1"
            />
            <ErrorMessage
              component="p"
              className="text-red-500 text-[12px] font-bold uppercase font-mont"
              name="customer"
            />
          </div>
          <input
            type="submit"
            value={params.id ? "Editar Proyecto" : "Agregar Proyecto"}
            className="mx-auto block w-4/5 mt-5 text-white bg-fondo p-2 mb-3 rounded-md font-mont uppercase font-bold cursor-pointer hover:bg-zinc-900 transition-colors"
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormularioTrabajo;
