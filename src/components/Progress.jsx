import React, { useState } from 'react'

const  Progress = ({done}) => {
  const [style, setStyle] = useState({})

  setTimeout(() => {
    const newStyle = {
        opacity: 1,
        width: `${done}%`,
    }
    setStyle(newStyle)
  }, 100);
  return (
    <>
        <p className='text-center text-fondo font-extrabold mb-2 font-mont uppercase text-md'>{done}% de tareas completadas</p>
        <div className='bg-[#4D9C9C] relative rounded-xl h-5 w-4/5 mx-auto'>
            <div className="bg-fondo absolute h-5 rounded-xl max-w-full" style={style}></div>
        </div>
    </>
  )
}

export default Progress