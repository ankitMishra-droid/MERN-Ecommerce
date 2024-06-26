import React, { useEffect, useState } from 'react'
import summaryApi from '../common'
import { toast } from 'react-toastify'
import moment from "moment"
import { RiEditFill } from "react-icons/ri";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([])
    const [closeUser, setCloseUser] = useState(false)
    const [updateUser, setUpdateUser] = useState({
        name: "",
        email: "",
        role: ""
    })


    const fetchAllUser = async(e) => {
        const fetchUser = await fetch(summaryApi.allUsers.url,{
            method: summaryApi.allUsers.method,
            credentials: "include"
        })

        const dataResponse = await fetchUser.json()

        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }

        if(dataResponse.error){
            toast.error(dataResponse.message)
        }
    }

    useEffect(() => {
        fetchAllUser()
    },[])
  return (
    <div className='pb-4 bg-white'>
      <table className='w-full userTable'>
        <thead>
            <tr>
                <th>Sr.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Created Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                allUsers.map((el, index) => {
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{el?.name}</td>
                            <td>{el?.email}</td>
                            <td>{el?.role}</td>
                            <td>{el?.phone}</td>
                            <td>{moment(el?.createdAt).format("ll")}</td>
                            <td>
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
        closeUser && (
            <ChangeUserRole onClose={() => 
                setCloseUser(false)}
                name={updateUser.name}
                email={updateUser.email}
                role={updateUser.role}
            />       
        )
    }
    </div>
  )
}

export default AllUsers
