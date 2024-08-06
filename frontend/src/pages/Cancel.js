/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import cancelImg from "../assets/Cancel.gif";
import {Link} from "react-router-dom"

const Cancel = () => {
  return (
    <div className="container w-full max-w-md mx-auto p-5 mt-8 rounded">
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-red-600 font-bold text-3xl mb-4 text-center">Payment<br />Failed</h3>
      <img
        src={cancelImg}
        className="mix-blend-multiply"
        alt="success image"
      //   width={150}
      //   height={150}
      />
      <Link to={"/cart"} className="p-2 px-3 mt-5 border-2 border-sky-600 text-sky-600 font-semibold hover:bg-sky-600 hover:text-white transition-all">Go To Cart</Link>
    </div>
  </div>
  )
}

export default Cancel
