import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import FormularioTrabajo from '../components/FormularioTrabajo'
import { useProyect } from '../context/ProyectContext';
import Swal from 'sweetalert2';
const EditarTrabajo = () => {
  const params = useParams();
  const {obtenerProyecto, proyect, eliminarProyecto} = useProyect();
  const navigate = useNavigate();

  useEffect(() => {
    obtenerProyecto(params.id);
  }, [navigate])


  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
        title: 'Estas seguro de eliminar este proyecto?',
        text: "No vas a poder recuperarlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "Cancelar",
        confirmButtonText: 'Si, eliminar!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await eliminarProyecto(params.id)
          Swal.fire(
            'Eliminado!',
            'Proyecto eliminado correctamente.',
            'success'
          )
          navigate("/trabajos");
        }
      })
}

  return (
    <>  
        <div className='flex flex-col md:flex-row justify-between'>
          <h1 className='uppercase font-bold text-fondo text-3xl text-center antialiased font-mont'>Edita tu trabajo</h1>
          <button className='p-2 bg-red-600 rounded-md text-white font-bold w-1/2 mx-auto my-2 hover:bg-red-500 md:w-1/6 md:mx-0 md:my-0' onClick={handleDelete}>ELIMINAR TRABAJO</button> 
        </div>
        <FormularioTrabajo />
    </>
    
    )
}

export default EditarTrabajo