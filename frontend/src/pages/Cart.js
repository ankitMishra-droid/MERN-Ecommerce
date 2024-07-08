/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useContext, useEffect, useState } from "react";
import summaryApi from "../common";
import Context from "../context";
import { Link } from "react-router-dom";
import displayCurrency from "../helpers/displayCurrency";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const context = useContext(Context);
  const loadinProduct = new Array(context?.cartProductCount).fill(null);

  const fetchProduct = async (req, res) => {
    // setLoading(true)

    const response = await fetch(summaryApi.addToCartViewProduct.url, {
      method: summaryApi.addToCartViewProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    setLoading(false);
    if (responseData.success) {
      setData(responseData?.data);
    }
  };

  // console.log(data)
  useEffect(() => {
    fetchProduct();
  }, []);

  const handleSubtotal = data.reduce((acc, product) => {
    return acc + (product?.productId?.selling || 0) * (product?.quantity || 1)
  }, 0)
  return (
    <div className="conatiner mx-auto p-1 mb-2 lg:mb-5">
      <div
        className="text-center text-lg my-3
      "
      >
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-10">
        <div className="w-full max-w-2xl">
          {loading
            ? loadinProduct.map((el, index) => {
                return (
                  <div
                    key={el + index + "Add Product"}
                    className="w-full bg-slate-200 h-32 my-1 animate-pulse"
                  >
                  </div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id}
                    className="w-full bg-white h-32 my-1 border-slate-300 p-1 pl-2 pr-2 md:pr-5 md:pl-5 flex justify-center items-center border-2 rounded"
                  >
                    <div className='h-28 w-28 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"'>
                      <img
                        src={product?.productId?.productImg}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                        alt={product?.productId?.brandName}
                      />
                    </div>
                    {/* <div className='w-full h-full flex justify-start px-4 py-2 items-start'>
                          <h2 className='capitalize'>{product?.productId?.brandName}</h2>
                      </div> */}
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <span className="capitalize line-clamp-1">
                              {product?.productId?.productName}
                            </span>
                          </h3>
                          <p className="ml-4 flex flex-col md:flex-row">
                            <span>
                              {displayCurrency(product?.productId?.selling)}
                            </span>
                            <span className="text-gray-500 line-through">
                              {displayCurrency(
                                product?.productId?.productPrice
                              )}
                            </span>
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product?.productId?.brandName}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border-gray-100">
                          <button className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-indigo-500 hover:text-blue-50">
                            {" "}
                            -{" "}
                          </button>
                          <input
                            type="text"
                            className="h-8 w-8 border bg-white text-center text-xs outline-none"
                            value={product?.quantity}
                            onChange={() => {}}
                          />
                          <button className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-indigo-500 hover:text-blue-50">
                            {" "}
                            +{" "}
                          </button>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        <div className="mt-5 lg:mt-0 w-full max-w-md">
          {loading ? (
            <div className="w-full bg-slate-200 h-36 "></div>
          ) : (
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 w-full">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">{displayCurrency(handleSubtotal)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">{displayCurrency(250)}</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">{displayCurrency(handleSubtotal + 250)}</p>
                  <p className="text-sm text-gray-700">including GST</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md bg-indigo-500 py-1.5 font-medium text-white hover:bg-indigo-600">
                Check out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
