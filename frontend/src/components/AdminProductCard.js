import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({ data, fetchdata }) => {
    const [editProduct, setEditProduct] = useState(false)
  return (
    <div className='bg-gray-200 p-4 rounded'>
        <div className='w-full pl-10 pr-10 sm:pl-0 sm:pr-0 sm:w-48 relative '>
            <div className='w-32 h-32 flex justify-center items-center mx-auto'>
                <img src={data?.productImg[0]} className='object-fill h-full mx-auto mix-blend-multiply' alt="productImage"/>
            </div>
                <h1 className='text-ellipsis line-clamp-2 break-words mt-4'>{data?.productName}</h1>

            <div>
                <div className='flex items-center gap-2 mt-4'>
                    <p className='font-semibold'>
                        {
                            displayCurrency(data?.selling)
                        }
                    </p>
                    <p className='line-through'>
                        {
                            displayCurrency(data?.productPrice)
                        }
                    </p>
                </div>
                <p className='mt-4 line-clamp-3'>
                    {
                        data?.productDescription
                    }
                </p>
            </div>

            <div className='w-fit cursor-pointer ml-auto p-2 text-white bg-gray-900 hover:bg-gray-800 transition-all rounded-full' onClick={() => setEditProduct(true)}>
                <MdEdit />
            </div>
            
            <div className='absolute w-10 h-10 rounded-full bg-orange-500 -top-8 -right-8 flex items-center justify-center text-sm text-white'>
                <p className='text-center'>{
                    Math.round((data.productPrice-data.selling)/(data.productPrice) * 100)
                }</p><span>%</span>
            </div>
        </div>
        {
            editProduct && (
                <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata}/>
            )
        }
        
    </div>
  )
}

export default AdminProductCard
