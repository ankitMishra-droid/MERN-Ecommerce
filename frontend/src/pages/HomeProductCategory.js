import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductCategory from '../common/category'
import summaryApi from '../common'
import VerticalProductCard from '../components/VerticalProductCard'
import loadingImg from "../assets/loading.svg"

const HomeProductCategory = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [sortBy, setSortBy] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObjects = {}
    urlCategoryListinArray.forEach(el => {
      urlCategoryListObjects[el] = true
    })

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObjects)
    const [filterCategoryProduct, setFilterCategoryProduct] = useState([])

    const fetchProduct = async() => {
      setLoading(true)
      const response = await fetch(summaryApi.filterProductItem.url, {
        method: summaryApi.filterProductItem.method,
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify({
          category : filterCategoryProduct
        })
      })

      const dataResponse = await response.json()
      setLoading(false)
      setData(dataResponse?.data || [])
    }

    const handleSelectCategory = (e) => {
      const {name, value, checked} = e.target

      setSelectCategory((prev) => {
        return{
          ...prev,
          [value] : checked
        }
      })
    }

    useEffect(() => {
      fetchProduct()
    },[filterCategoryProduct])

    // console.log("select category: ", selectCategory)
    useEffect(() => {
      const arrayOfCategory = Object.keys(selectCategory).map(categoryName => {
        if(selectCategory[categoryName]){
          return categoryName
        }

        return null
      }).filter(el => el  )

      setFilterCategoryProduct(arrayOfCategory)

      const urlFormat = arrayOfCategory.map((el, index) => {
        if((arrayOfCategory.length - 1) === index){
          return `category=${el}`
        }

        return `category=${el}&&`
      })

      console.log(urlFormat.join(""))
      navigate("/product-category?"+urlFormat.join(""))
    },[selectCategory])


    const handleSortedProduct = (e) => {
      const { value } = e.target

      setSortBy(value)

      if(value === "asc"){
        setData(prev => prev.sort((a,b) => a.selling - b.selling))
      }

      if(value === "dsc"){
        setData(prev => prev.sort((a,b) => b.selling - a.selling))
      }
    }

    useEffect(() => {},[sortBy])
  return (
    <div className='container mx-auto p-4'>
      {/* desktop */}
        <div className='hidden lg:grid grid-cols-[200px,1fr]'>
          {/* left side */}
          <div className='bg-slate-300 p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
            {/* sort by */}
              <div>
                  <h3 className='text-base uppercase text-violet-600 font-medium border-b pb-1 border-slate-400'>Sort By</h3>

                  <form className='text-sm flex flex-col gap-2 py-2'>
                    <div className='flex items-center gap-4'>
                      <input type='radio' name='sortBy' checked={sortBy === "asc"} onChange={handleSortedProduct} value={'asc'}/>
                      <label>Price: Low To High</label>
                    </div>

                    <div className='flex items-center gap-4'>
                      <input type='radio' name='sortBy' checked={sortBy === "dsc"} onChange={handleSortedProduct} value={'dsc'}/>
                      <label>Price: High To Low</label>
                    </div>
                  </form>
              </div>
              {/* filter by */}
              <div>
                  <h3 className='text-base uppercase text-violet-600 font-medium border-b pb-1 border-slate-400'>Category</h3>

                  <form className='text-sm flex flex-col gap-2 py-2'>
                    {
                      ProductCategory.map((category,index) => {
                        return(
                          <div className='flex items-center gap-4' key={category + "category" + index}>
                            <input type='checkbox' name={"category"} checked={selectCategory[category?.values]} value={category?.values} id={category?.values} onChange={handleSelectCategory}/>
                            <label htmlFor={category?.values}>{category?.label}</label>
                          </div>
                        )
                      })
                    }
                  </form>
              </div>
          </div>
          {/* right side */}
          {
            loading ? (
              <div className='flex justify-center items-center'>
                <img src={loadingImg} className='w-20 h-20 block mx-auto' alt={loadingImg} />
              </div>
            ) : (
          <div className='px-4'>
            <p>Search Results: {data?.length}</p>
              {
                data.length !== 0 && !loading && (
                    <VerticalProductCard data={data} loading={loading} />
                )
              }
          </div>
          )
        }
        </div>
    </div>
  )
}

export default HomeProductCategory
