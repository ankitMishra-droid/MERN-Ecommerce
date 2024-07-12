import React, { useEffect, useState } from 'react'
import banner1 from "../assets/banner/boat.webp"
import banner2 from "../assets/banner/watch.webp"
import banner3 from "../assets/banner/realme.jpg"
import banner4 from "../assets/banner/tv.jpg"

import banner1Mobile from "../assets/banner/5.avif"
import banner2Mobile from "../assets/banner/boat_mobile.webp"
import banner3Mobile from "../assets/banner/hadphone_mobile.jpg"
import banner4Mobile from "../assets/banner/tv_mobile.jpg"

import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

const BannerProduct = () => {

  const [currentImage, setCurrentImage] = useState(0)

  const desktopImg = [
    banner1,
    banner2,
    banner3,
    banner4,
  ]

  const mobileImages = [
    banner1Mobile,
    banner2Mobile,
    banner3Mobile,
    banner4Mobile,
  ]

  const nextImage = () => {
    if(desktopImg.length - 1 > currentImage){
      setCurrentImage(prev => prev + 1)
    }
  }

  const prevImage = () => {
    if(currentImage !== 0){
      setCurrentImage(prev => prev - 1)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if(desktopImg.length -1 > currentImage){
        nextImage()
      }else{
        setCurrentImage(0)
      }
    }, 5000)

    return () => clearInterval(interval)
  },[currentImage])

  return (
    <div className='container mx-auto px-4 rounded-md mt-3'>
      <div className='h-60 md:h-96 w-full bg-cyan-100 relative'>
        
        <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
          <div className='flex justify-between w-full text-2xl pl-2 pr-2'>
            <button onClick={prevImage} className='shadow-md rounded-full text-white bg-black p-1'><FaChevronLeft /></button>
            <button onClick={nextImage} className='shadow-md rounded-full text-white bg-black p-1'><FaChevronRight /></button>
          </div>
        </div>

        <div className='hidden md:flex w-full h-full overflow-hidden rounded-md'>
          {
            desktopImg.map((imageUrl, index) => {
              return(
                <div className='w-full h-full min-w-full min-h-full transition-all rounded' key={imageUrl} style={{ transform: `translateX(-${currentImage * 100}%)`}}>
                  <img src={imageUrl} className='w-full h-full rounded-md' alt={imageUrl + index}/>
                </div>
              )
            })
          }
        </div>

        <div className='flex w-full h-full overflow-hidden md:hidden rounded'>
          {
            mobileImages.map((imageUrl, index) => {
              return(
                <div className='w-full h-full min-h-full min-w-full transition-all' key={imageUrl} style={{transform: `translate(-${currentImage * 100}%)`}}>
                  <img src={imageUrl} className='w-full h-full' alt={imageUrl + index}/>
                </div>
              )
            })
          }
        </div>

      </div>
    </div>
  )
}

export default BannerProduct
