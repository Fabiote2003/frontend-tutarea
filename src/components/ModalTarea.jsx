import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik"; //, ErrorMessage
import * as Yup from "yup";
import Swal from "sweetalert2";
import { formatearFecha } from "./../helpers/formaterFecha";

import { useProyect } from "./../context/ProyectContext";
import { useTask } from "./../context/TaskContext";

function ModalTarea({
  openModal,
  setOpenModal,
  idUser,
  tarea,
  dateEndProyect,
}) {
  const { creatTaskContext, updateTaskContext } = useTask();
  const { proyect } = useProyect();
  // console.log(proyect.dateEnd)

  const navigate = useNavigate();

  const [proyectDateEnd, proyectSetDateEnd] = useState();

  //tengo de desestructurar xq de otra forma no me gusrda el ID en proyect, supongo xq de esta forma esta como un objeto
  const { id } = proyect;
  const [task, setTask] = useState({
    name: "",
    descripcion: "",
    dateEnd: "",
    priority: "",
    state: false,
    createUser: idUser,
    proyect: id,
  });

  useEffect(() => {
    const formattedDateEnd = proyect.dateEnd?.split("T")[0];
    proyectSetDateEnd(formattedDateEnd);
  }, [proyect]);

  //console.log("only proyect", proyect);
  console.log("fecha limite🔥🔥🔥🔥🔥", proyect.dateEnd?.split("T")[0]);
  //console.log("fecha limite por props🔥🔥🔥🔥🔥",dateEndProyect?.split('T')[0]);

  useEffect(() => {
    if (tarea?.id) {
      setTask({
        ...task,
        descripcion: tarea.descripcion,
        name: tarea.name,
        dateEnd: tarea.dateEnd?.split("T")[0],
        state: tarea.state,
        priority: tarea.priority,
        id: tarea.id,
      });
    }
  }, [openModal]);

  const taskSuccesCreate = async (msg) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "¡Proyecto " + `"` + msg + `"` + " se a creado  exitosamente!",
      showConfirmButton: false,
      timer: 1000,
    });
    setOpenModal(!openModal);
    setTimeout(() => {
      navigate(`/trabajos/${id}`);
    }, 500);
  };

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={() => setOpenModal(false)}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500"
                  onClick={() => setOpenModal(false)}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="#FF0000"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-left sm:mt-0 sm:ml-4 sm:text-left w-full font-mont">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl uppercase font-mont text-center leading-6 font-bold text-gray-900"
                  >
                    {tarea?.id ? "EDITAR TAREA" : "NUEVA TAREA"}
                  </Dialog.Title>
                  {proyectDateEnd && (
                    <Formik
                      initialValues={task}
                      validationSchema={Yup.object({
                        name: Yup.string()
                          .required("el nombre es requerido")
                          .min(
                            3,
                            "el nombre debe contener como minimo 3 caracteres"
                          )
                          .max(90),
                        descripcion: Yup.string()
                          .required("el campo es requerido")
                          .min(
                            3,
                            "el nombre debe contener como minimo 3 caracteres"
                          )
                          .max(
                            300,
                            "el nombre debe contener un maximo de 300 caracteres"
                          ),
                        dateEnd: Yup.date()
                          .required("La fecha es obligatoria")
                          .min(
                            new Date(),
                            "La fecha no puede ser menor que la fecha actual"
                          )
                          .max(
                            new Date(proyectDateEnd),
                            `La fecha no puede ser mayor a la fecha de entreaga del proyecto ${formatearFecha(
                              proyectDateEnd
                            )}`
                          ),
                        priority: Yup.string().required(
                          "debes seleccionar una prioridad de entraga para esta tarea"
                        ),
                      })}
                      onSubmit={async (values) => {
                        console.log("🎉🎉🎉🎉", values);
                        const tokenUser = localStorage.getItem("token");

                        if (tarea?.id) {
                          await updateTaskContext(values, tokenUser);
                          setOpenModal(false);
                          Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "¡Tarea ctualizada!",
                            showConfirmButton: false,
                            timer: 1000,
                          });
                          return;
                        }

                        const rta = await creatTaskContext(
                          id,
                          values,
                          tokenUser
                        );
                        console.log("😉😉😉", rta);
                        if (rta?.status === 200) {
                          await taskSuccesCreate(rta.data.name);
                        } else {
                          console.log("ERROR");
                        }
                      }}
                      enableReinitialize={true}
                    >
                      {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit} className="my-5">
                          <div className="mb-5">
                            <label
                              className="text-gray-700 uppercase font-bold text-sm"
                              htmlFor="nombre"
                            >
                              Nombre tarea
                            </label>
                            <Field
                              name="name"
                              type="text"
                              id="nombre"
                              className="border-2 w-full mt-2 p-2 rounded-md placeholder-gray-400"
                              placeholder="Nombre de la tarea "
                            />
                            <ErrorMessage
                              component="p"
                              className="text-red-500 text-[12px] font-bold uppercase font-mont"
                              name="name"
                            />
                          </div>
                          <div className="mb-5">
                            <label
                              className="text-gray-700 uppercase font-bold text-sm"
                              htmlFor="descripcion"
                            >
                              Descripción tarea
                            </label>
                            <Field
                              name="descripcion"
                              type="textarea"
                              id="descripcion"
                              className="border-2 w-full mt-2 p-2 rounded-md placeholder-gray-400"
                              placeholder="Descripción de la tarea "
                            />
                            <ErrorMessage
                              component="p"
                              className="text-red-500 text-[12px] font-bold uppercase font-mont"
                              name="descripcion"
                            />
                          </div>
                          <div className="mb-5">
                            <label
                              className="text-gray-700 uppercase font-bold text-sm"
                              htmlFor="fecha-entrega"
                            >
                              Fecha de Entrega
                            </label>
                            <Field
                              name="dateEnd"
                              type="date"
                              id="fecha-entrega"
                              className="border-2 w-full mt-2 p-2 rounded-md placeholder-gray-400"
                            />
                            <ErrorMessage
                              component="p"
                              className="text-red-500 text-[12px] font-bold uppercase font-mont"
                              name="dateEnd"
                            />
                          </div>
                          <div className="mb-5">
                            <label
                              className="text-gray-700 uppercase font-bold text-sm"
                              htmlFor="prioridad"
                            >
                              Prioridad tarea
                            </label>
                            <Field
                              as="select"
                              className="border-2 w-full mt-2 p-2 rounded-md placeholder-gray-400"
                              placeholder="Prioridad de la tarea"
                              name="priority"
                            >
                              <option value="">Seleccione Prioridad</option>
                              <option value="Baja">Baja</option>
                              <option value="Media">Media</option>
                              <option value="Alta">Alta</option>
                            </Field>

                            <ErrorMessage
                              component="p"
                              className="text-red-500 text-[12px] font-bold uppercase font-mont"
                              name="priority"
                            />
                          </div>
                          <button
                            type="submit"
                            className="p-3 w-full bg-fondo font-inter hover:bg-zinc-900 text-white uppercase font-bold text-center cursor-pointer transition-colors rounded"
                          >
                            {tarea?.id ? "ACTUALIZAR TAREA" : "CREAR TAREA"}
                          </button>
                        </Form>
                      )}
                    </Formik>
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ModalTarea;
