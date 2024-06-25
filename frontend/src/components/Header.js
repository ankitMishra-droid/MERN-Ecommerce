import React from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr"
import { FaUserAlt } from "react-icons/fa"
import { PiShoppingCartSimpleFill } from "react-icons/pi"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import summaryApi from '../common'
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice'

const Header = () => {
    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()

    console.log("user header", user)

    const handleLogout = async(e) => {
        try {
            const res = await fetch(summaryApi.logoutUser.url, {
                method: summaryApi.logoutUser.method,
                credentials: "include"
            })

            const dataRes = await res.json()

            if(dataRes.success){
                toast.success(dataRes.message)
                dispatch(setUserDetails(null))
            }

            if(dataRes.error){
                toast.error(dataRes.message)
            }
        } catch (error) {
            console.error('Failed to fetch:', error);
        }
    }
  return (
    <header className='h-16 shadow-md bg-white'>
    <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
            <Link to="/"><Logo w={90} h={50}/></Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full pl-2 focus-within:shadow'>
            <input type='text' className='w-full outline-none' placeholder='search product here...'/>
            <div className='text-lg min-w-[50px] h-8 bg-slate-600 flex items-center justify-center rounded-r-full text-white cursor-pointer'>
                <GrSearch />
            </div>
        </div>

        <div className='flex items-center gap-4 sm:gap-6'>
            <div className='cursor-pointer text-3xl'>
                {
                    user?.profilePic ? 
                    (
                        <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user.name}/>
                    ) :
                    (
                        <FaUserAlt />
                    )
                }
            </div>
            <div className='cursor-pointer text-3xl relative'>
                <span><PiShoppingCartSimpleFill /></span>
                <div className='bg-orange-500 text-white w-5 h-5 p-1 rounded-full flex items-center justify-center absolute -top-1 -right-3'>
                    <p className='text-sm'>0</p>
                </div>
            </div>
            <div className=''>
                {
                    user?._id ? 
                    (
                        <button onClick={handleLogout} className='px-3 py-1 pb-2 rounded-full text-white bg-slate-600 hover:bg-slate-800 font-bold'>Logout</button>
                    ) : (
                        <Link to="/login" className='px-3 py-1 pb-2 rounded-full text-white bg-slate-600 hover:bg-slate-800 font-bold'>Login</Link>
                    )
                }
            </div>
        </div>

    </div>
    </header>
  )
}

export default Header
