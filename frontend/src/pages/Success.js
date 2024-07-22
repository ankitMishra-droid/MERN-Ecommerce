import React from "react";
import successImg from "../assets/success.gif";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="container w-full max-w-md mx-auto p-5 mt-8 rounded">
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-sky-800 font-bold text-3xl mb-4 text-center">Order Placed <br />SuccessFully</h3>
        <img
          src={successImg}
          className="mix-blend-multiply"
          alt="success image"
        //   width={150}
        //   height={150}
        />
        <Link to={"/"} className="p-2 px-3 mt-5 border-2 border-sky-600 text-sky-600 font-semibold hover:bg-sky-600 hover:text-white transition-all">See Orders</Link>
      </div>
    </div>
  );
};

export default Success;
