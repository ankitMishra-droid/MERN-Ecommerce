import React, { useState } from 'react'
import UploadProduct from '../components/UploadProduct'

const AllProducts = () => {

  const [openUploadProduct, setOpenUploadProduct] = useState(false)

  return (
    <>
    <div className='bg-white py-2 px-4 flex justify-between items-center'>
      <h2 className='font-bold text-xl'>All Products</h2>
      <button className='border py-1 px-3 bg-white hover:bg-orange-500 hover:text-white rounded-md font-bold transition-all' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
    </div>

    {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)}/>
        )
    }
    </>
  )
}

export default AllProducts
