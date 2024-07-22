import React from 'react'
import cancelImg from "../assets/Cancel.gif";

const Cancel = () => {
  return (
    <div className="container w-full max-w-md mx-auto p-5 mt-8 rounded">
      <div className="flex flex-col justify-center items-center">
        <img
          src={cancelImg}
          className="mix-blend-multiply"
          alt="success image"
          width={150}
          height={150}
        />
        <h3 className="text-red-600 font-semibold text-xl mt-4">Payment Cancel</h3>
      </div>
    </div>
  )
}

export default Cancel
