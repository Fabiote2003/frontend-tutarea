import { Fragment, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { useProyect } from '../context/ProyectContext'
import { useUser } from '../context/UserContext'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Busqueda = () => {
    const [ busqueda, setBusqueda] = useState('')
    const {handleBuscador, buscador } = useProyect();
    const {allProyectByUser} = useUser();

    console.log(allProyectByUser)

    const proyectosFiltrados = busqueda === '' ? [] : allProyectByUser.filter((proyecto) => proyecto.name.toLowerCase().includes(busqueda.toLowerCase()))
    return (
        <Transition.Root show={buscador} as={Fragment} afterLeave={ () => setBusqueda('') }>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto mt-20 p-4 sm:p-20 md:p-20" onClose={handleBuscador}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                <Combobox
                    as="div"
                    className="mx-auto max-w-xl transform  divide-gray-100  rounded-md bg-white shadow-2xl transition-all"
                    onChange={(proyect) => (window.location = `/trabajos/${proyect.id}`)}
                >
                    <div className="relative">
                        <Combobox.Input
                            className="h-12 w-full bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 sm:text-sm"
                            placeholder="Buscar..."
                            value={busqueda}
                            onChange={e => setBusqueda(e.target.value)}
                        />
                    </div>

                    {proyectosFiltrados.length > 0 && (
                        <Combobox.Options static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                            {proyectosFiltrados.map(proyecto => (
                                <Combobox.Option key={proyecto._id}
                                    value={proyecto}
                                    className={({active}) => classNames('cursor-default px-4 py-2', active && 'bg-sky-500 text-white font-semibold')}
                                >
                                    {proyecto.name}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    )}
                    </Combobox>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    )
}

export default Busqueda
  