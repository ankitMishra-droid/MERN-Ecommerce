import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr"
import { FaUserAlt } from "react-icons/fa"
import { PiShoppingCartSimpleFill } from "react-icons/pi"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import summaryApi from '../common'
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice'
import ROLE from '../common/role'
import Context from '../context'

const Header = () => {
    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const [menuDisplay, setMenuDisplay] = useState(false)
    const context = useContext(Context)
    const searchInput = useLocation()
    const [search, setSearch] = useState(searchInput?.search?.split("=")[1])

    const navigate = useNavigate()

    // console.log("user header", user)

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

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value)
        if(value){
            navigate(`/search?q=${value}`)
        }else{
            navigate(`/search`)
        }
    }
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-30'>
    <div className='h-full container mx-auto flex items-center px-4 justify-between sticky'>
        <div className=''>
            <Link to="/"><Logo w={90} h={50}/></Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full pl-2 focus-within:shadow'>
            <input type='text' className='w-full outline-none' placeholder='search product here...' onChange={handleSearch} value={search}/>
            <div className='text-lg min-w-[50px] h-8 bg-gray-900 flex items-center justify-center rounded-r-full text-white cursor-pointer'>
                <GrSearch />
            </div>
        </div>

        <div className='flex items-center gap-4 sm:gap-6'>
            <div className='relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                {
                    user?._id && (
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
                    )
                }

                {
                    menuDisplay && (
                        <>
                            {
                                    (user?.role === ROLE.ADMIN || user?.role === ROLE.EMPLOYEE) && (
                                        <div className='absolute bg-white bottom-0 top-11 p-2 h-fit shadow-lg rounded'>
                                            <nav>
                                                <Link to={"admin-panel/all-products"} className='whitespace-nowrap hover:text-orange-500'>Admin Panel</Link>
                                            </nav>
                                        </div>
                                    )
                            }
                        </>
                        
                    )
                }
                
            </div>
            {/* <div className='cursor-pointer text-3xl relative'>
                <span><PiShoppingCartSimpleFill /></span>
                <div className='bg-orange-500 text-white w-5 h-5 p-1 rounded-full flex items-center justify-center absolute -top-1 -right-3'>
                    <p className='text-sm'>{context?.cartProductCount}</p>
                </div>
            </div> */}
            {
                     user?._id && (
                      <Link to={"/cart"} className='text-2xl relative'>
                          <span><PiShoppingCartSimpleFill /></span>
      
                          <div className='bg-orange-500 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                              <p className='text-sm'>{context?.cartProductCount}</p>
                          </div>
                      </Link>
                      )
                  }
            <div className=''>
                {
                    user?._id ? 
                    (
                        <button onClick={handleLogout} className='px-3 py-1 pb-2 rounded-md btn-24 transition-all duration-500  font-semibold text-white'>Logout</button>
                    ) : (
                        <Link to="/login" className='btn-24'>Login</Link>
                    )
                }
            </div>
        </div>

    </div>
    </header>
  )
}

export default Header
