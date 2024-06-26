import React, { useState } from "react";
import ROLE from "../common/role";
import { IoCloseSharp } from "react-icons/io5";
import summaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({
    name, email, role, onClose
}) => {
  const [userRole, setUserRole] = useState("")

  const handleChangeUserRole = (e) => {
    setUserRole(e.target.value)
    console.log(e.target.value)
  }

  const updateUserDetails = async(e) => {
    const fetchResponse = await fetch(summaryApi.editUserDetails.url, {
        method: summaryApi.editUserDetails.method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            role : userRole
        })
    })

    const responseData = await fetchResponse.json()

    if(responseData.success){
        toast.success(responseData.message)
    }
    console.log("responseData: ", responseData)
  }
  return (
    <>
        <div className="fixed top-0 bottom-0 right-0 left-0 w-full h-full flex justify-center items-center bg-slate-200 bg-opacity-50">
          <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
            <button
              className="block ml-auto p-2"
              onClick={onClose}
            >
              <IoCloseSharp />
            </button>

            <h1 className="text-lg font-medium pb-2">Change User Role</h1>

            <p>Name: {name}</p>
            <p>Email: {email}</p>

            <div className="flex justify-between my-4">
              <p>Role: </p>
              <select className="px-4 py-1 border" value={userRole} onChange={handleChangeUserRole}>
                {Object.values(ROLE).map((el) => {
                  return (
                    <option value={el} key={el}>
                      {el}
                    </option>
                  );
                })}
              </select>
            </div>

            <button className="w-fit block mx-auto py-1 px-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-center" onClick={updateUserDetails}>
              Update Role
            </button>
          </div>
        </div>
    </>
  );
};

export default ChangeUserRole;
