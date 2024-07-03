import React, { useEffect, useRef, useState } from 'react'
import fetchCategorywiseProduct from '../helpers/fetchCategorywiseProduct'
import displayCurrency from '../helpers/displayCurrency'

import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(12).fill(null)

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

    const fetchData = async() => {

        setLoading(true)
        const categoryProduct = await fetchCategorywiseProduct(category)
        setLoading(false)
        console.log("category list: ", categoryProduct.data)
        setData(categoryProduct?.data)
    }

    const nextProduct = () => {
        scrollElement.current.scrollLeft += 300
    }

    const prevProduct = () => {
        scrollElement.current.scrollLeft -= 300
    }

    useEffect(() => {
        fetchData()
    }, [])
  return (
    <div className='container mx-auto px-4 my-6 relative'>
        
        <h2 className='font-bold text-2xl'>{heading}</h2>

        <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
            <button onClick={prevProduct} className='shadow-md rounded-full text-white bg-black p-1 absolute left-0 z-10 hidden md:block'><FaChevronLeft /></button>
            <button onClick={nextProduct} className='shadow-md rounded-full text-white bg-black p-1 absolute right-0 z-10 hidden md:block'><FaChevronRight /></button>
            {
                data.map((product, index) => {
                    return(
                        <div className='md:max-w-[300px] min-w-[280px] md:min-w-[320px] md:h-36 h-auto shandow mt-10 mb-10 flex w-full max-w-xs relative overflow-hidden rounded-lg border border-gray-100 md:bg-white bg-slate-200 flex-col md:flex-row shadow-md'>
                            <span className="absolute z-10 top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{Math.round((product?.productPrice - product?.selling)/(product?.productPrice) * 100 )}% OFF</span>
                            <div className='bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px]'>
                                <img src={product?.productImg[0]} className='object-scale-down h-full hover:scale-110 transition-all' alt={product?.productImg + index}/>
                            </div>
                            <div className='p-4 flex flex-col justify-center items-center md:items-start'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                <p className='capitalize text-gray-500'><span className='normal-case'>{product?.brandName} </span>{product?.category}</p>
                                <div className='flex gap-3'>
                                    <span className="font-bold text-slate-900">{displayCurrency(product?.selling)}</span>
                                    <span className="text-slate-900 line-through">{displayCurrency(product?.productPrice)}</span>
                                </div>
                                <button className="flex mt-2 items-center justify-center rounded-md bg-slate-900 px-3 py-0.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default HorizontalCardProduct
