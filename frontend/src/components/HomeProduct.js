import React, { useEffect, useState } from "react";
import summaryApi from "../common";
import { Link } from "react-router-dom";

const HomeProduct = () => {
  const [loading, setLoading] = useState(true);
  const [categoryProduct, setCategoryProduct] = useState([]);

  const categoryLoadingMap = new Array(12).fill(null);

  const fetchCategoryProduct = async (e) => {
    const response = await fetch(summaryApi.getProductbyCategory.url, {
      method: summaryApi.getProductbyCategory.method,
      credentials: "include",
    });

    const responseData = await response.json();
    setLoading(false);

    setCategoryProduct(responseData.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);
  return (
    <div className="container mx-auto p-2 md:p-4">
      <div className="flex gap-4 items-center justify-between overflow-scroll scrollbar-none">
        {loading
          ? 
            categoryLoadingMap.map((el, index) => {
                return(
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-slate-200 flex items-center justify-center animate-pulse" key={"category"+index}></div>
                )
            })
          : categoryProduct.map((product, index) => {
              return (
                <Link
                  to={"/product-category/" + product?.category}
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
              );
            })}
      </div>
    </div>
  );
};

export default HomeProduct;
