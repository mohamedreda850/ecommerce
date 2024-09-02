import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
   <>
   <Navbar />
<Outlet />


   <div className='p-5 text-white bg-slate-950 text-center'>
    <h2 className='text-4xl'>
        Footer
    </h2>
   </div>
    </>
  )
}

export default Layout