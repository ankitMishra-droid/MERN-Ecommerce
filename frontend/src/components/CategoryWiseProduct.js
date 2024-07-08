import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
// import addToCart from '../helpers/addToCart'
// import Context from '../context'
// import scrollTop from '../helpers/scrollTop'
import fetchCategorywiseProduct from '../helpers/fetchCategorywiseProduct'
import displayCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'

const CategroyWiseProduct = ({category, heading}) => {
    const [data, setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)
    const { fetchAddToCartCount } = useContext(Context)

    // const { fetchUserAddToCart } = useContext(Context)

    // const handleAddToCart = async(e,id)=>{
    //    await addToCart(e,id)
    //    fetchUserAddToCart()
    // }
    
    const handleCountUpdate = async(e, id) => {
        await addToCart(e, id)
        fetchAddToCartCount()
    }

    const fetchData = async() => {

        setLoading(true)
        const categoryProduct = await fetchCategorywiseProduct(category)
        setLoading(false)
        setData(categoryProduct?.data)
    }

    useEffect(() => {
        fetchData()
    }, [])




  return (
    <div className='container mx-auto px-4 my-6 relative'>

            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

                
           <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
           {

                loading ? (
                    loadingList.map((product,index)=>{
                        return(
                            <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow ' key={product + index}>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <p className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></p>
                                    <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                        <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                    </div>
                                    <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data.map((product,index)=>{
                        return(
                            <Link to={"product/"+product?._id} className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow ' key={product?.productName + index}>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                    <img src={product.productImg[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' alt={product?.productImg}/>
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-slate-600 font-medium'>{ displayCurrency(product?.selling) }</p>
                                        <p className='text-slate-500 line-through'>{ displayCurrency(product?.productPrice)  }</p>
                                    </div>
                                    <button className='text-sm bg-gray-800 hover:bg-gray-900 text-white px-3 py-0.5 rounded-full' onClick={(e)=> handleCountUpdate(e,product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        )
                    })
                )
                
            }
           </div>
            

    </div>
  )
}

export default CategroyWiseProduct