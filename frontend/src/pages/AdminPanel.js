import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from '../common/role'
import { PiUsersThreeFill } from "react-icons/pi";
import { AiFillProduct } from "react-icons/ai";
import { RiDashboardHorizontalFill } from "react-icons/ri";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);

  const navigate = useNavigate()

  useEffect(() => {
    if(user?.role !== ROLE.ADMIN && user?.role !== ROLE.EMPLOYEE){
      navigate("/")
    }
  },[user])
  return (
    <div className="min-h-[calc(100vh-120px)] lg:flex">
      <aside className="bg-white min-h-full w-full hidden lg:block lg:max-w-60 customShadow ">
        <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>
        <div className="flex items-center justify-between px-8 py-5">
          <div className="cursor-pointer text-5xl relative flex justify-center shrink-0 rounded-[.95rem]">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-16 h-16 shrink-0 inline-block rounded-full"
                alt={user.name}
              />
            ) : (
              <FaUserAlt />
            )}
          </div>
          <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>

          <div className="flex flex-col justify-center items-center">
            <p className="capitalize text-lg font-semibold">{user?.name}</p>
            <p className="capitalize text-sm font-semibold">{user?.role}</p>
          </div>
        </div>
        <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>

        <nav className="grid p-4">
        <div className="flex justify-start items-center">
            <Link
              to={"admin-dashboard"}
              className="px-6 py-1 text-gray-500 text-lg hover:text-gray-600 group flex justify-center items-center font-medium"
            >
              <RiDashboardHorizontalFill className="font-xl text-gray-500 group-hover:text-gray-900" />
              <span className="px-2">Dashboard</span>
            </Link>
          </div>
          <div className="flex justify-start items-center select-none">
            <Link
              to={"all-users"}
              className="px-6 py-1 text-gray-500 hover:text-gray-600 text-lg group flex justify-center items-center font-medium"
            >
              <PiUsersThreeFill className="font-xl text-gray-500 group-hover:text-gray-900" />
              <span className="px-2">Clients</span>
            </Link>
          </div>
          <div className="flex justify-start items-center">
            <Link
              to={"all-products"}
              className="px-6 py-1 text-gray-500 text-lg hover:text-gray-600 group flex justify-center items-center font-medium"
            >
              <AiFillProduct className="font-xl text-gray-500 group-hover:text-gray-900" />
              <span className="px-2">Products</span>
            </Link>
          </div>
        </nav>
      </aside>

      <menu className="w-full h-full p-4">
        <Outlet />
      </menu>
    </div>
  );
};

export default AdminPanel;
