/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import summaryApi from "../common";
import displayCurrency from "../helpers/displayCurrency";
import CategroyWiseProduct from "../components/CategoryWiseProduct";
import addToCart from "../helpers/addToCart";
import Context from "../context";

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

  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState("");
  const [moveZoomImage, setMoveZoomImage] = useState("0% 0%");
  const [zoomedImage, setZoomedImage] = useState(false);

  const { fetchAddToCartCount } = useContext(Context);

  const handleZoomImage = (e) => {
    const { top, left, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMoveZoomImage(`${x}% ${y}%`);
  };

  const params = useParams();

  const fetchProductDetails = async () => {
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
    setActiveImage(dataResponse?.data?.productImg[0]);
  };

  const handleMouseImageOnHover = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchAddToCartCount();
    navigate("/cart");
  };

  const handleBuy = async (e, id) => {
    await addToCart(e, id);
    fetchAddToCartCount();
    navigate("/cart");
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  return (
    <>
      <div className="container mx-auto mt-10 mb-10 pr-6 pl-6 md:pr-14 md:pl-28 lg:pr-28 lg:pl-28">
        {/* product details started */}
        <div className="min-h-[200px] flex flex-col md:flex-row justify-between gap-0 md:gap-4">
          {/* images display */}
          <div className="w-full md:w-1/2 h-auto md:h-96 flex flex-col md:flex-row-reverse gap-4">
            <div
              className="w-full h-full min-w-full min-h-full bg-slate-200 relative overflow-hidden"
              onMouseMove={handleZoomImage}
              onMouseEnter={() => setZoomedImage(true)}
              onMouseLeave={() => setZoomedImage(false)}
              style={{
                backgroundImage: zoomedImage ? `url(${activeImage})` : "none",
                backgroundPosition: moveZoomImage,
                backgroundSize: "230%",
                backgroundRepeat: "no-repeat",
              }}
            >
              <img
                src={activeImage}
                className={`w-full h-full min-w-full min-h-full object-scale-down mix-blend-multiply transition-opacity duration-300 ${
                  zoomedImage ? "opacity-0" : "opacity-100"
                }`}
                alt={data.productName}
              />

              <div className="absolute z-10 top-0 left-0 m-2 rounded-full bg-black px-3 text-center text-sm font-medium text-white">
                {Math.round(
                  ((data?.productPrice - data?.selling) / data?.productPrice) *
                    100
                )}
                % OFF
              </div>
            </div>
            <div className="h-full">
              {loading ? (
                <div className="flex gap-4 md:flex-col overflow-scroll scrollbar-none h-full">
                  {productListLoading.map((e, i) => (
                    <div
                      className="bg-slate-200 w-20 h-20 rounded animate-pulse"
                      key={"loading" + i}
                    ></div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-2 md:flex-col overflow-scroll scrollbar-none h-full">
                  {data.productImg.map((imgURL, i) => (
                    <div
                      className="bg-slate-200 w-20 h-auto md:h-20 rounded p-1"
                      key={"productImg" + i}
                    >
                      <img
                        src={imgURL}
                        className="h-full w-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseImageOnHover(imgURL)}
                        alt={imgURL}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* details display */}
          {loading ? (
            <div className="grid w-full gap-1 mt-5 md:mt-0 ">
              <span className="bg-slate-200 px-5 text-center animate-pulse text-sm font-medium text-white rounded-full capitalize inline-block h-6 w-2/4"></span>
              <p className="text-2xl lg:text-4xl font-medium animate-pulse h-6 w-2/4 bg-slate-200 rounded-full"></p>
              <p className="capitalize text-slate-400 animate-pulse text-lg h-6 w-2/4 bg-slate-200 rounded-full"></p>

              <div className="flex items-center text-2xl gap-2 font-medium animate-pulse h-6 w-2/4 bg-slate-200 rounded-full">
                <p className="text-black"></p>
                <p className="text-slate-400 line-through"></p>
              </div>

              <div className="flex items-center gap-3 my-2">
                <button className="h-6 w-1/4 animate-pulse bg-slate-200 rounded-full px-3 py-1 min-w-[120px]"></button>
                <button className="h-6 w-1/4 animate-pulse bg-slate-200 rounded-full px-3 py-1 min-w-[120px]"></button>
              </div>

              <div className="h-6 w-2/4 bg-slate-200 animate-pulse rounded-full px-3 py-1 min-w-[120px]">
                <p className="text-slate-600 font-medium my-1"></p>
                <p></p>
              </div>
            </div>
          ) : (
            <div className="w-full md:w-1/2 flex flex-col gap-1 mt-5 md:mt-0">
              <span className="bg-black px-2 text-center text-sm font-medium text-white rounded-full capitalize inline-block w-fit">
                {data?.brandName}
              </span>
              <p className="text-2xl lg:text-4xl font-medium">
                {data?.productName}
              </p>
              <p className="capitalize text-slate-400 text-lg">
                {data?.brandName}
              </p>

              <div className="flex items-center text-xl sm:text-2xl gap-2 font-medium">
                <p className="text-black">{displayCurrency(data?.selling)}</p>
                <p className="text-slate-400 line-through">
                  {displayCurrency(data?.productPrice)}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 my-2">
                <button
                  className="border-2 border-gray-950 rounded px-3 py-1 w-full md:min-w-[120px] font-medium hover:bg-black hover:text-white transition-all"
                  onClick={(e) => handleBuy(e, data?._id)}
                >
                  Buy Now
                </button>
                <button
                  className="border-2 border-gray-950 rounded px-3 py-1 w-full md:min-w-[120px] font-medium bg-black text-white hover:bg-white hover:text-black transition-all"
                  onClick={(e) => handleAddToCart(e, data?._id)}
                >
                  Add To Cart
                </button>
              </div>

              <div>
                <p className="text-slate-600 font-medium my-1">Description:</p>
                <p>{data?.productDescription}</p>
              </div>
            </div>
          )}
        </div>
        {/* product details end */}
      </div>

      {/* recommended product section started */}
      {data.category && (
        <div>
          <CategroyWiseProduct
            category={data?.category}
            heading={"Recommended Products"}
          />
        </div>
      )}
      {/* recommended product section ended */}
    </>
  );
};

export default ProductDetail;
