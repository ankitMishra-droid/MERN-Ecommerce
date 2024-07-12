import React from 'react'
import HomeProduct from '../components/HomeProduct'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'

const Home = () => {
  return (
    <div className='pl-8 pr-8 py-5 container block mx-auto'>
      <HomeProduct />
      <BannerProduct />
      <HorizontalCardProduct category={"airpods"} heading={"Top Deals on Airbuds"}/>
      <HorizontalCardProduct category={"earphones"} heading={"Top Deals on Earphones & Head Phones"}/>
      <HorizontalCardProduct category={"mouse"} heading={"Top Deals on Mouse"}/>
      <HorizontalCardProduct category={"tv"} heading={"Top Deals on TV"}/>
      <HorizontalCardProduct category={"watches"} heading={"Top Deals on Watches"}/>
      <HorizontalCardProduct category={"phone"} heading={"Top Deals on Mobile Phones"}/>
      <HorizontalCardProduct category={"camera"} heading={"Top Deals on Camera"}/>
    </div>
  )
}

export default Home
