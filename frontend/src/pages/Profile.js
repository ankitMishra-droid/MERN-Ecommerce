import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdModeEdit } from "react-icons/md";
import summaryApi from "../common";
import { toast } from "react-toastify";

const Profile = () => {
  const user = useSelector((state) => state?.user?.user);
  const [editFields, setEditFields] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
  });

  const [updateIndividualUser, setUpdateIndividualUser] = useState(() => {
    // Load saved user data from local storage or use initial user data from Redux store
    const savedUser = JSON.parse(localStorage.getItem("userProfile"));
    return (
      savedUser || {
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
        userId: user?._id,
      }
    );
  });

  useEffect(() => {
    // Save updated user data to local storage whenever it changes
    // localStorage.setItem("userProfile", JSON.stringify(updateIndividualUser));
  }, [updateIndividualUser]);

  const handleEditButton = (field) => {
    setEditFields((prevFields) => ({
      ...prevFields,
      [field]: !prevFields[field],
    }));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUpdateIndividualUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateUserDetails = async (e) => {
    const fetchResponse = await fetch(summaryApi.editUserDetails.url, {
      method: summaryApi.editUserDetails.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: updateIndividualUser._id,
        phone: updateIndividualUser.phone,
        name: updateIndividualUser.name,
        email: updateIndividualUser.email,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      localStorage.setItem("userProfile", JSON.stringify(updateIndividualUser));
      window.location.reload(true);
    }
    console.log("responseData: ", responseData);
  };

  return (
    <div className="bg-white overflow-hidden w-full md:w-2/4 block mx-auto mt-6 shadow rounded-lg border">
      <div className="flex gap-2 line-clamp-1 justify-between items-center px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          User Profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm line-clamp-1 text-gray-500 w-28 h-16">
          {user?.profilePic && (
            <img
              src={user?.profilePic}
              className="line-clamp-1"
              alt={user?.profilePic}
            />
          )}
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {updateIndividualUser.name}
            </dd>
            <div className="inline-block m-auto cursor-pointer">
              <MdModeEdit onClick={() => handleEditButton("name")} />
            </div>
            {editFields.name && (
              <>
                <input
                  type="text"
                  value={updateIndividualUser.name}
                  name="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none transition-all focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleOnChange}
                />
                <button
                  onClick={() => handleEditButton("name")}
                  className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-gray-900 to-gray-700 border-gray-700 text-white"
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span className="relative">Cancel</span>
                </button>
                <button
                  onClick={updateUserDetails}
                  className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-black to-gray-600 border-gray-700 text-white"
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span className="relative">Update</span>
                </button>
              </>
            )}
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {updateIndividualUser.email}
            </dd>
            <div className="inline-block m-auto cursor-pointer">
              <MdModeEdit onClick={() => handleEditButton("email")} />
            </div>
            {editFields.email && (
              <>
                <input
                  type="email"
                  value={updateIndividualUser.email}
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none transition-all focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleOnChange}
                />
                <button
                  onClick={() => handleEditButton("email")}
                  className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-gray-900 to-gray-700 border-gray-700 text-white"
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span className="relative">Cancel</span>
                </button>
                <button
                  onClick={updateUserDetails}
                  className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-black to-gray-600 border-gray-700 text-white"
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span className="relative">Update</span>
                </button>
              </>
            )}
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {updateIndividualUser.phone}
            </dd>
            <div className="inline-block m-auto cursor-pointer">
              <MdModeEdit onClick={() => handleEditButton("phone")} />
            </div>
            {editFields.phone && (
              <>
                <input
                  type="text"
                  value={updateIndividualUser.phone}
                  name="phone"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none transition-all focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleOnChange}
                />
                <button
                  onClick={() => handleEditButton("phone")}
                  className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-gray-900 to-gray-700 border-gray-700 text-white"
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span className="relative">Cancel</span>
                </button>
                <button
                  onClick={updateUserDetails}
                  className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-black to-gray-600 border-gray-700 text-white"
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span className="relative">Update</span>
                </button>
              </>
            )}
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {updateIndividualUser.address || "Add Address"}
            </dd>
            <div className="inline-block m-auto cursor-pointer">
              <MdModeEdit onClick={() => handleEditButton("address")} />
            </div>
            {editFields.address && (
              <>
                <input
                  type="text"
                  value={updateIndividualUser.address}
                  name="address"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none transition-all focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleOnChange}
                />
                <button
                  onClick={() => handleEditButton("address")}
                  className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-gray-900 to-gray-700 border-gray-700 text-white"
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span className="relative">Cancel</span>
                </button>
                <button
                  onClick={updateUserDetails}
                  className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-black to-gray-600 border-gray-700 text-white"
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span className="relative">Update</span>
                </button>
              </>
            )}
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Profile;
