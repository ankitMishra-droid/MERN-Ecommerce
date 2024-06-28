import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import ProductCategory from "../common/category";
import { FaUpload } from "react-icons/fa";
import uploadOnCloudinary from "../helpers/uploadOnloudinary";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";

const UploadProduct = ({ onClose }) => {
  // eslint-disable-next-line no-unused-vars
  const [uploadImageInput, setUploadImageInput] =useState("")
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    productDescription: "",
    productPrice: "",
    selling: "",
    productImg: [],
    category: "",
  });

  const [openImage, setOpenImage] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState("")

  const handleUploadPic = async(e) => {
    const file = e.target.files[0]
    const uploadImage = await uploadOnCloudinary(file)

    setData((prevData) => ({
      ...prevData,
      productImg: [...prevData.productImg, uploadImage.url]
    }))
  }

  const handleOnChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDeleteProductImg = async(index) => {
    console.log("image index", index)
    const newProductImg = [...data.productImg]
    newProductImg.splice(index, 1)

    setData((preveData) => {
      return{
        ...preveData,
        productImg: [...newProductImg]
      }
    })
  }
  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-40 z-10 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <button
            className="w-fit ml-auto text-2xl hover:text-orange-400"
            onClick={onClose}
          >
            <IoCloseSharp />
          </button>
        </div>

        <form className="overflow-y-scroll h-full p-2">
          <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
            <div className="w-full  mb-4 mt-6">
              <label htmlFor="" className="mb-2 dark:text-gray-300">
                Product Name
              </label>
              <input
                type="text"
                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Product Name"
                value={data.productName}
                name="productName"
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full  mb-4 mt-6">
              <label htmlFor="" className=" dark:text-gray-300">
                Brand Name
              </label>
              <input
                type="text"
                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Brand Name"
                value={data.brandName}
                name="brandName"
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
            <div className="w-full mb-4">
              <h3 className="dark:text-gray-300 mb-2">Product Description</h3>
              <input
                type="text"
                className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Product Description"
                value={data.productDescription}
                name="productDescription"
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full mb-4">
              <h3 className="dark:text-gray-300 mb-2">Product Price</h3>
              <input
                type="number"
                className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Product Price"
                value={data.productPrice}
                name="productPrice"
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
            <div className="w-full mb-4">
              <h3 className="dark:text-gray-300 mb-2">Selling Price</h3>
              <input
                type="number"
                className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Selling Price"
                value={data.selling}
                name="selling"
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full mb-4">
              <h3 className="dark:text-gray-300 mb-2">Product Category</h3>
              <select
                  class="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" value={data.category} defaultValue={""}>
                    {
                      ProductCategory.map((el,index) => {
                        return(
                          <option value={el.values} key={el.values+index}>{el.label}</option>
                        )
                      })
                    }
              </select>
            </div>
          </div>
          <div className="w-full mb-4 ">
            <label htmlFor="productImage" className="">Product Image</label>
            <label htmlFor="uploadImageInput">
              <div className="w-full flex justify-center p-2 mt-3 border rounded h-28 items-center flex-col cursor-pointer">
                  <span className="text-4xl"><FaUpload /></span>
                  <p className="text-sm">Upload Product Image</p>
                  <input type="file" id="uploadImageInput" className="hidden" onChange={handleUploadPic}/>
              </div>
            </label>
          </div>

          {
            data?.productImg[0] ? (
              <div className="flex items-center gap-3">
                {
                  data.productImg.map((el, index) => {
                    return(
                      <div className="relative group" key={el?.asset_id}>
                        <img src={el} width={80} height={80} className="mt-3 border bg-gray-200 cursor-pointer" alt={""} onClick={() => {
                          setOpenImage(true)
                          setFullScreenImage(el)
                        }} />
                        <div className="absolute bottom-0 right-0 bg-gray-800 text-white hidden group-hover:block rounded-full p-1 cursor-pointer" onClick={() => handleDeleteProductImg(index)}>
                          <MdDelete />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            ) : (
              <>
                <p className="text-red-500">** please upload product</p>
              </>
            )
          }
          

          <div className="w-full rounded-lg bg-gray-900 mt-4 text-white text-lg font-semibold mb-3">
            <button type="submit" className="w-full p-4">
              Submit
            </button>
          </div>
        </form>
      </div>

      {
        openImage && (
          <DisplayImage onClose={() => setOpenImage(false)} imgUrl={fullScreenImage} />
        )
      }
      
    </div>
  );
};

export default UploadProduct;
