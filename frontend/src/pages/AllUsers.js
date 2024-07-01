import React, { useEffect, useState } from 'react'
import summaryApi from '../common'
import { toast } from 'react-toastify'
import moment from "moment"
import { RiEditFill } from "react-icons/ri";
import ChangeUserRole from '../components/ChangeUserRole';
import LoadingGif from "../assets/loading.svg"

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([])
    const [closeUser, setCloseUser] = useState(false)
    const [loading, setLoading] = useState(true)
    const [updateUser, setUpdateUser] = useState({
        name: "",
        email: "",
        role: "",
        _id: "",
    })


    const fetchAllUser = async(e) => {
        const fetchUser = await fetch(summaryApi.allUsers.url,{
            method: summaryApi.allUsers.method,
            credentials: "include"
        })

        const dataResponse = await fetchUser.json()

        if(dataResponse.success){
            setAllUsers(dataResponse.data)
            setLoading(false)
        }

        if(dataResponse.error){
            toast.error(dataResponse.message)
        }
    }

    useEffect(() => {
        fetchAllUser()
    },[])
  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden mx-3 md:mx-4'>
      <table className='w-full table-fixed'>
        <thead>
            <tr className='bg-gray-100'>
                <th className='w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase'>Sr.</th>
                <th className='w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase'>Name</th>
                <th className='w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase'>Email</th>
                <th className='w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase'>Role</th>
                <th className='w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase'>Phone</th>
                <th className='w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase'>Created Date</th>
                <th className='w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase'>Actions</th>
            </tr>
        </thead>
        <tbody className='bg-white'>
            {
                allUsers.map((el, index) => {
                    return(
                        <tr key={el?._id} className='font-medium'>
                            <td className='py-4 px-6 border-b border-gray-200'>{index+1}</td>
                            <td className='py-4 px-6 border-b border-gray-200'>{el?.name}</td>
                            <td className='py-4 px-6 border-b border-gray-200 break-words'>{el?.email}</td>
                            <td className='py-4 px-6 border-b border-gray-200'>{el?.role}</td>
                            <td className='py-4 px-6 border-b border-gray-200 break-all'>{el?.phone}</td>
                            <td className='py-4 px-6 border-b border-gray-200'>{moment(el?.createdAt).format("ll")}</td>
                            <td className='py-4 px-6 border-b border-gray-200'>
                                <button className='bg-green-100 hover:bg-green-400 hover:text-white p-2 rounded-full' onClick={() => {
                                    setUpdateUser(el)
                                    setCloseUser(true)
                                }}><RiEditFill /></button>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
      </table>
      {
        loading && (
            <>
                <div className='mt-7 block m-auto'>
                    <img src={LoadingGif} alt='LoadingGif' className='w-8 h-8 block m-auto'/>
                </div>
            </>
        )
      }
      {
            closeUser && (
                <ChangeUserRole onClose={() => 
                    setCloseUser(false)}
                    name={updateUser.name}
                    email={updateUser.email}
                    role={updateUser.role}
                    userId={updateUser._id}
                    callFunc={fetchAllUser}
                />       
            )
        }
    </div>
  )
}

export default AllUsers
