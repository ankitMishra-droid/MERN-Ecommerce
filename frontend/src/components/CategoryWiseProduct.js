import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import addToCart from '../helpers/addToCart'
// import Context from '../context'
// import scrollTop from '../helpers/scrollTop'
import fetchCategorywiseProduct from "../helpers/fetchCategorywiseProduct";
import displayCurrency from "../helpers/displayCurrency";
import Context from "../context";
import addToCart from "../helpers/addToCart";
import ScrollToTop from "../helpers/ScrollToTop";

const CategroyWiseProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const { fetchAddToCartCount } = useContext(Context);

  const handleCountUpdate = async (e, id) => {
    await addToCart(e, id);
    fetchAddToCartCount();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategorywiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-1 md:p-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div
                  className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
                  key={product + index}
                >
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                  <div className="p-4 grid gap-3">
                    <p className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></p>
                    <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2"></p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
                      <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
                    </div>
                    <button className="text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                // <Link
                //   to={"/product/" + product?._id}
                //   className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
                //   key={product?.productName + index}
                //   onClick={ScrollToTop}
                // >
                //   <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                //     <img
                //       src={product.productImg[0]}
                //       className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                //       alt={product?.productImg}
                //     />
                //   </div>
                //   <div className="p-4 grid gap-3">
                //     <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                //       {product?.productName}
                //     </h2>
                //     <p className="capitalize text-slate-500">
                //       {product?.category}
                //     </p>
                //     <div className="flex gap-3">
                //       <p className="text-slate-600 font-medium">
                //         {displayCurrency(product?.selling)}
                //       </p>
                //       <p className="text-slate-500 line-through">
                //         {displayCurrency(product?.productPrice)}
                //       </p>
                //     </div>
                //     <button
                //       className="text-sm bg-gray-800 hover:bg-gray-900 text-white px-3 py-0.5 rounded-full"
                //       onClick={(e) => handleCountUpdate(e, product?._id)}
                //     >
                //       Add to Cart
                //     </button>
                //   </div>
                // </Link>

                // <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                <Link
                  to={"/product/" + product?._id}
                  className="text-gray-700 cursor-pointer mb-12"
                  key={product?.productName + index}
                  onClick={ScrollToTop}
                >
                  <div className="overflow-hidden bg-slate-200 p-4 flex justify-center items-center">
                    <img
                      src={product.productImg[0]}
                      className="ease-in-out object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                      alt={product?.productImg}
                    />
                  </div>
                  <p className="pt-3 pb-1 text-sm">{product?.productName}</p>
                  <p className="text-sm font-medium">
                    {displayCurrency(product?.selling)}
                    <span className="pl-1">
                      <s>{displayCurrency(product?.productPrice)}</s>
                    </span>
                  </p>

                  <button
                    className="text-sm w-full mt-3 pt-2 pb-2 bg-gray-800 hover:bg-gray-900 text-white px-3 py-0.5 rounded-full"
                    onClick={(e) => handleCountUpdate(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </Link>
                // </div>
              );
            })}
      </div>
    </div>
  );
};

export default CategroyWiseProduct;
