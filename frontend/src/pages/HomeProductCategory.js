import React, { useEffect, useState } from 'react'
import { json, useParams } from 'react-router-dom'
import ProductCategory from '../common/category'
import CategroyWiseProduct from '../components/CategoryWiseProduct'
import summaryApi from '../common'
import VerticalProductCard from '../components/VerticalProductCard'

const HomeProductCategory = () => {
    const params = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectCategory, setSelectCategory] = useState({})
    const [filterCategoryProduct, setFilterCategoryProduct] = useState([])

    const fetchProduct = async() => {
      setLoading(true)
      const response = await fetch(summaryApi.filterProductItem.url, {
        method: summaryApi.filterProductItem.method,
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          category : filterCategoryProduct
        })
      })

      const dataResponse = response.json()
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
    },[selectCategory])
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
                      <input type='radio' name='sortBy'/>
                      <label>Price: Low To High</label>
                    </div>

                    <div className='flex items-center gap-4'>
                      <input type='radio' name='sortBy'/>
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
                          <div className='flex items-center gap-4' key={category + index}>
                            <input type='checkbox' name={"category"} checked={selectCategory[category?.values]} value={category?.values} id={category?.values} onChange={handleSelectCategory}/>
                            <label>{category?.label}</label>
                          </div>
                        )
                      })
                    }
                  </form>
              </div>
          </div>
          {/* right side */}
          <div>
              {
                data.length !== 0 && !loading && (
                  <VerticalProductCard data={data} loading={loading} />
                )
              }
          </div>
        </div>
    </div>
  )
}

export default HomeProductCategory
