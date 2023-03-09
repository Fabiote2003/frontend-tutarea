import React from 'react'

const FormularioTrabajo = () => {
  return (
    <form className='bg-white w-full sm:w-4/6 mx-auto mt-2 md:mt-10 rounded-md p-5 shadow-md'>
            <div className='mb-2'>
                <label htmlFor="nombre" className='text-fondo uppercase font-mont text-sm font-semibold'>Nombre</label>
                <input type="text" id='nombre' placeholder='Ingrese el nombre del trabajo' className='placeholder:font-mont w-full mt-1 border rounded-sm placeholder:text-sm focus:outline-[#4D9C9C] p-1'/>
            </div>
            <div className='mb-2'>
                <label htmlFor="descripcion" className='text-fondo uppercase font-mont text-sm font-semibold'>Descripción</label>
                <input type="text" id='descripcion' placeholder='Ingrese una descripción' className='placeholder:font-mont w-full mt-1 border rounded-sm placeholder:text-sm focus:outline-[#4D9C9C] p-1'/>
            </div>
            <div className='mb-2'>
                <label htmlFor="fechaEntrega" className='text-fondo uppercase font-mont text-sm font-semibold'>Fecha de entrega</label>
                <input type="date" id='fechaEntrega' placeholder='Ingrese el nombre del trabajo' className='placeholder:font-mont w-full mt-1 border rounded-sm placeholder:text-sm focus:outline-[#4D9C9C] p-1'/>
            </div>
            <div className='mb-2'>
                <label htmlFor="materia" className='text-fondo uppercase font-mont text-sm font-semibold'>Nombre de la Materia</label>
                <input type="text" id='materia' placeholder='Ingrese nombre de la materia' className='placeholder:font-mont w-full mt-1 border rounded-sm placeholder:text-sm focus:outline-[#4D9C9C] p-1'/>
            </div>
            <input type="submit" value="Agregar Trabajo" className='mx-auto block w-4/5 mt-5 text-white bg-fondo p-2 mb-3 rounded-md font-mont uppercase font-bold cursor-pointer hover:bg-zinc-900 transition-colors'/>
    </form>
  )
}

export default FormularioTrabajo