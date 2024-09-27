import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import summaryApi from '../common';
import loadingImg from "../assets/loading.svg"
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {

  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [ allProduct, setAllProduct ] = useState([]);
  const [loading, setLoading] = useState(true)

  const fetchAllProduct = async() => {
    const response = await fetch(summaryApi.getAllProduct.url, {
      method: summaryApi.getAllProduct.method
    })

    const responseData = await response.json()

    setAllProduct(responseData?.data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchAllProduct()
  },[])

  return (
    <>
    <div className='bg-white py-2 px-4 flex justify-between items-center'>
      <h2 className='font-bold text-xl'>All Products</h2>
      <button className='border py-1 px-3 bg-white hover:bg-orange-500 hover:text-white rounded-md font-bold transition-all' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
    </div>

    {
      loading && (
        <div className='mt-7 block m-auto'>
            <img src={loadingImg} alt='LoadingGif' className='w-8 h-8 block m-auto'/>
        </div>
      )
    }
    {/* display all product */}
    <div className='flex justify-center items-center flex-wrap h-[calc(100vh-190px)] gap-5 py-5 overflow-y-scroll'>
      {
        allProduct.map((product, index) => {
          return(
            <>
            <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
            </>
          )
        })
      }
    </div>


    {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
        )
    }

    </>
  )
}

export default AllProducts
