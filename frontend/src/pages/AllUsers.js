import React, { useEffect, useState } from "react";
import summaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { RiEditFill } from "react-icons/ri";
import ChangeUserRole from "../components/ChangeUserRole";
import LoadingGif from "../assets/loading.svg";
import { MdDelete } from "react-icons/md";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [closeUser, setCloseUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [updateUser, setUpdateUser] = useState({
    name: "",
    email: "",
    role: "",
    _id: "",
  });

  const fetchAllUser = async (e) => {
    const fetchUser = await fetch(summaryApi.allUsers.url, {
      method: summaryApi.allUsers.method,
      credentials: "include",
    });

    const dataResponse = await fetchUser.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
      setLoading(false);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleDeleteUser = async (id) => {
    const response = await fetch(summaryApi.deleteUser.url, {
      method: summaryApi.deleteUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const dataResponse = await response.json();

    console.log(dataResponse?.data?._id);
    if (dataResponse.success) {
      fetchAllUser();
      toast.success(dataResponse.message);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.error);
    }
  };
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-3 md:mx-4">
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Sr.
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Name
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Email
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Role
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Phone
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Created Date
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {allUsers.map((el, index) => {
            return (
              <tr key={el?._id} className="font-medium">
                <td className="py-4 px-6 border-b border-gray-200">
                  {index + 1}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {el?.name}
                </td>
                <td className="py-4 px-6 border-b border-gray-200 line-clamp-6">
                  {el?.email}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {el?.role}
                </td>
                <td className="py-4 px-6 border-b border-gray-200 break-all">
                  {el?.phone}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {moment(el?.createdAt).format("ll")}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  <button
                    className="bg-green-100 ml-2 hover:bg-green-400 hover:text-white p-2 rounded-full"
                    onClick={() => {
                      setUpdateUser(el);
                      setCloseUser(true);
                    }}
                  >
                    <RiEditFill />
                  </button>

                  {/* <button
                    className="bg-green-100 ml-2 hover:bg-green-400 hover:text-white p-2 rounded-full"
                    onClick={() => handleDeleteUser(el?._id)}
                  >
                    <MdDelete />
                  </button> */}

                  <button
                    className="bg-green-100 ml-2 hover:bg-green-400 hover:text-white p-2 rounded-full"
                    type="button"
                    onClick={() => setShowModal(true)}
                  >
                    <MdDelete />
                  </button>

                  {showModal && (
                    <>
                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                          {/*content*/}
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                              <h3 className="text-3xl font-semibold">
                                {el?.name}
                              </h3>
                              <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                              >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                  ×
                                </span>
                              </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                Are you sure?
                              </p>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                              <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                              >
                                Close
                              </button>
                              <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => handleDeleteUser(el?._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {loading && (
        <>
          <div className="mt-7 block m-auto">
            <img
              src={LoadingGif}
              alt="LoadingGif"
              className="w-8 h-8 block m-auto"
            />
          </div>
        </>
      )}
      {closeUser && (
        <ChangeUserRole
          onClose={() => setCloseUser(false)}
          name={updateUser.name}
          email={updateUser.email}
          role={updateUser.role}
          userId={updateUser._id}
          callFunc={fetchAllUser}
        />
      )}
    </div>
  );
};

export default AllUsers;
