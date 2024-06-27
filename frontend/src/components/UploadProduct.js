import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";

const UploadProduct = ({onClose}) => {
    const [data, setData] = useState({
        
    })
  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-40 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%]'>
        <div className='flex justify-between items-center'>
            <h2 className='font-bold text-lg'>Upload Product</h2>
            <button className='w-fit ml-auto text-2xl hover:text-orange-400' onClick={onClose}><IoCloseSharp /></button>
        </div>
      </div>
    </div>
  )
}

export default UploadProduct
