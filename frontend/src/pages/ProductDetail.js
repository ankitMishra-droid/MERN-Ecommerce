import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import summaryApi from "../common";
import displayCurrency from "../helpers/displayCurrency";

const ProductDetail = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    productDescription: "",
    productPrice: "",
    selling: "",
    productImg: [],
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const productListLoading = new Array(4).fill(null);

  const [activeImage, setActiveImage] = useState("")

  const params = useParams();

  const fetchProductDetails = async (e) => {
    setLoading(true);
    const response = await fetch(summaryApi.getProductDetails.url, {
      method: summaryApi.getProductDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });

    setLoading(false);
    const dataResponse = await response.json();

    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImg[0])
  };

  const handleMouseImageOnHover = (imageUrl) => {
    setActiveImage(imageUrl)
  }
//   console.log("data: ", data);
  useEffect(() => {
    fetchProductDetails();
  }, [params]);
  return (
    <div className="conatiner mx-auto mt-10 mb-10">
      <div className="min-h-[200px] flex flex-col md:flex-row gap-0 md:gap-4">
        {/* images display */}
        <div className="h-96 md:h-96 flex flex-col md:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative">
            <img src={activeImage} className="h-full w-full object-scale-down mix-blend-multiply" alt={data.productName} />

            <div className="absolute z-10 top-0 left-0 m-2 rounded-full bg-black px-3 text-center text-sm font-medium text-white">{Math.round((data?.productPrice-data?.selling)/(data?.productPrice)*100)}% OFF</div>
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-4 md:flex-col overflow-scroll scrollbar-none h-full">
                {productListLoading.map((e, i) => {
                  return (
                    <div
                      className="bg-slate-200 w-20 h-20 rounded animate-pulse"
                      key={"loading" + i}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-4 md:flex-col overflow-scroll scrollbar-none h-full">
                {data.productImg.map((imgURL, i) => {
                  return (
                    <div
                      className="bg-slate-200 w-20 h-20 rounded"
                      key={"productImg" + i}
                    >
                      <img src={imgURL} className="h-full w-full object-scale-down mix-blend-multiply cursor-pointer" onMouseEnter={() => handleMouseImageOnHover(imgURL)} alt={imgURL} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* details display */}
        <div className="flex flex-col gap-1">
            <span className="bg-black px-2 text-center text-sm font-medium text-white rounded-full capitalize inline-block w-fit">{data?.brandName}</span>
            <p className="text-2xl lg:text-4xl font-medium">{data?.productName}</p>
            <p className="capitalize text-slate-400 text-lg">{data?.brandName}</p>

            <div className="flex items-center text-2xl gap-2 font-medium">
                <p className="text-black">{displayCurrency(data?.selling)}</p>
                <p className="text-slate-400 line-through">{displayCurrency(data?.productPrice)}</p>
            </div>

            <div className="flex items-center gap-3 my-2">
                <button className="border-2 border-gray-950 rounded px-3 py-1 min-w-[120px] font-medium hover:bg-black hover:text-white transition-all">Buy Now</button>
                <button className="border-2 border-gray-950 rounded px-3 py-1 min-w-[120px] font-medium bg-black text-white hover:bg-white hover:text-black transition-all">Add To Cart</button>
            </div>

            <div>
                <p className="text-slate-600 font-medium my-1">Description:</p>
                <p>{data?.productDescription}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
