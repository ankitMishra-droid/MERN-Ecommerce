import React, { useEffect, useState, useMemo } from "react";
import summaryApi from "../common";
import { Link } from "react-router-dom";

const HomeProduct = () => {
  const [loading, setLoading] = useState(true);
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [productall, setProductall] = useState([]);

  const categoryLoadingMap = useMemo(() => new Array(12).fill(null), []);

  const fetchCategoryProduct = async () => {
    try {
      const response = await fetch(summaryApi.getProductbyCategory.url, {
        method: summaryApi.getProductbyCategory.method,
        credentials: "include",
      });

      const responseData = await response.json();
      setCategoryProduct(responseData.data || []);  // Ensure response data exists
    } catch (error) {
      console.error("Failed to fetch category products:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllProduct = async () => {
    try {
      const response = await fetch(summaryApi.getAllProduct.url, {
        method: summaryApi.getAllProduct.method,
        credentials: "include",
      });

      const responseData = await response.json();
      setProductall(responseData.data || []);
    } catch (error) {
      console.error(`Get all product error: ${error}`);
    }
  };

  useEffect(() => {
    getAllProduct();
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-2 md:p-4">
      <div className="flex gap-4 items-center justify-between overflow-scroll scrollbar-none">
        {loading ? (
          categoryLoadingMap.map((_, index) => (
            <div
              className="w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-slate-200 flex items-center justify-center animate-pulse"
              key={"category" + index}
            ></div>
          ))
        ) : (
          <>
            {/* Example to render all products */}
            {/* <Link to={`/product-category?category=all`} className="cursor-pointer">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-slate-200 flex items-center justify-center">
                <img
                  src={""}
                  alt={"All"}
                  className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                />
              </div>
              <p className="text-center capitalize md:text-base text-sm">All</p>
            </Link> */}
            {categoryProduct.map((product, index) => (
              <Link
                to={`/product-category?category=${product?.category}`}
                className="cursor-pointer"
                key={product?.category + index}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-slate-200 flex items-center justify-center">
                  <img
                    src={product?.productImg[0]}
                    alt={product?.category}
                    className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                  />
                </div>
                <p className="text-center capitalize md:text-base text-sm">
                  {product?.category}
                </p>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default HomeProduct;
