import React from 'react'
import { useSelector } from 'react-redux'
import { FaUserAlt } from "react-icons/fa"
import { Link, Outlet } from 'react-router-dom'

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
      <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
        <div className='h-32 flex justify-center items-center flex-col'>
            <div className='cursor-pointer text-5xl relative flex justify-center'>
                {
                    user?.profilePic ? 
                    (
                        <img src={user?.profilePic} className='w-16 h-16 rounded-full' alt={user.name}/>
                    ) :
                    (
                        <FaUserAlt />
                    )
                }
            </div>

            <p className='capitalize text-lg font-semibold'>{user?.name}</p>
            <p className='capitalize text-sm font-semibold'>{user?.role}</p>
        </div>

        <nav className='grid p-4'>
                <Link to={"all-users"} className='px-2 py-1 hover:text-orange-500'>Clients</Link>
                <Link to={"all-products"} className='px-2 py-1 hover:text-orange-500'>Products</Link>
        </nav>
      </aside>

      <menu className='w-full h-full p-4'>
        <Outlet />
      </menu>
    </div>
  )
}

export default AdminPanel
