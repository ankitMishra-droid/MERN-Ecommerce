import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import summaryApi from '../common'
import loadingGif from "../assets/loading.svg"
import VerticalProductCard from '../components/VerticalProductCard'

const SearchProduct = () => {
    const query = useLocation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchSearchProduct = async() => {
        setLoading(true)
        const response = await fetch(summaryApi.searchProductItem.url+query.search)
        const dataResponse = await response.json()

        setLoading(false)
        setData(dataResponse?.data)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchSearchProduct()
        },1500)
        return () => {
            clearTimeout(timeout)
        }
    }, [query])
  return (
    <div className='container mx-auto p-4'>
        {
            loading && (
                <img src={loadingGif} className='text-center block mx-auto w-14 h-14' alt={loadingGif}/>
            )
        }
        <p className='p-2 text-lg font-semibold'>Search Results: {data.length}</p>
        {
            data.length === 0 && !loading && (
                <p className='text-center text-sm'>No results found</p>
            )
        }
        {
            data.length !== 0 && !loading && (
                <VerticalProductCard loading={loading} data={data}/>
            )
        }
    </div>
  )
}

export default SearchProduct
