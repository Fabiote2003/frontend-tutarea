import React from 'react'
import { Outlet } from 'react-router-dom'
import {useUser}  from './../context/UserContext'

const AuthLayout = () => {
  const {setCargando,cargando} = useUser()

 
  return (
    <>
   <Outlet />  
   
    </>
  )
}

export default AuthLayout
