import React, { useEffect, useState } from 'react'
import banner1 from "../assets/banner/img1.webp"
import banner2 from "../assets/banner/img2.webp"
import banner3 from "../assets/banner/img3.jpg"
import banner4 from "../assets/banner/img4.jpg"
import banner5 from "../assets/banner/img5.webp"

import banner1Mobile from "../assets/banner/img1_mobile.jpg"
import banner2Mobile from "../assets/banner/img2_mobile.webp"
import banner3Mobile from "../assets/banner/img3_mobile.jpg"
import banner4Mobile from "../assets/banner/img4_mobile.jpg"
import banner5Mobile from "../assets/banner/img5_mobile.png"

import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

const BannerProduct = () => {

  const [currentImage, setCurrentImage] = useState(0)

  const desktopImg = [
    banner1,
    banner2,
    banner3,
    banner4,
    banner5,
  ]

  const mobileImages = [
    banner1Mobile,
    banner2Mobile,
    banner3Mobile,
    banner4Mobile,
    banner5Mobile
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
      <div className='h-60 md:h-72 w-full bg-cyan-100 relative'>
        
        <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
          <div className='flex justify-between w-full text-2xl pl-2 pr-2'>
            <button onClick={prevImage} className='shadow-md rounded-full text-white bg-black p-1'><FaChevronLeft /></button>
            <button onClick={nextImage} className='shadow-md rounded-full text-white bg-black p-1'><FaChevronRight /></button>
          </div>
        </div>

        <div className='hidden md:flex w-full h-full overflow-hidden'>
          {
            desktopImg.map((imageUrl, index) => {
              return(
                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageUrl} style={{ transform: `translateX(-${currentImage * 100}%)`}}>
                  <img src={imageUrl} className='w-full h-full' alt={imageUrl + index}/>
                </div>
              )
            })
          }
        </div>

        <div className='flex w-full h-full overflow-hidden md:hidden'>
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
