import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
    <div className='rounded max-w-5xl mx-auto shadow-lg bg-white'>
    <div
        className="w-fit ml-auto text-2xl hover:text-orange-400 cursor-pointer"
        onClick={onClose}
    >
        <IoCloseSharp />
    </div>
    <div className='flex justify-center max-w-[80vh] max-h-[80vh]'>
        <img src={imgUrl} alt='product img' className='w-full h-full'/>
    </div>
    </div>
    </div>
  )
}

export default DisplayImage
