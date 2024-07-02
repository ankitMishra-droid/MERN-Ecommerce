import React from 'react'
import HomeProduct from '../components/HomeProduct'
import BannerProduct from '../components/BannerProduct'

const Home = () => {
  return (
    <div className='pl-8 pr-8 py-5 container flex justify-center flex-wrap items-center'>
      <HomeProduct />
      <BannerProduct />
    </div>
  )
}

export default Home
