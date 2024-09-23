import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCategory from "../common/category";
import summaryApi from "../common";
import VerticalProductCard from "../components/VerticalProductCard";
import loadingImg from "../assets/loading.svg";

const HomeProductCategory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const urlSearch = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const urlCategoryListinArray = useMemo(
    () => urlSearch.getAll("category"),
    [urlSearch]
  );

  // Initial category state from URL params
  const initialCategoryState = useMemo(() => {
    return urlCategoryListinArray.reduce((acc, category) => {
      acc[category] = true;
      return acc;
    }, {});
  }, [urlCategoryListinArray]);

  const [selectCategory, setSelectCategory] = useState(initialCategoryState);

  // Filter products based on selected categories
  const filterCategoryProduct = useMemo(() => {
    return Object.keys(selectCategory).filter(
      (category) => selectCategory[category]
    );
  }, [selectCategory]);

  // Fetch products based on selected categories
  const fetchProduct = useCallback(async () => {
    if (filterCategoryProduct.length === 0) return; // Avoid fetching if no categories are selected
    setLoading(true);
    try {
      const response = await fetch(summaryApi.filterProductItem.url, {
        method: summaryApi.filterProductItem.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: filterCategoryProduct }),
      });
      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [filterCategoryProduct]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // Update URL based on selected categories
  useEffect(() => {
    const urlFormat = filterCategoryProduct
      .map((el) => `category=${el}`)
      .join("&");

    if (filterCategoryProduct.length) {
      navigate(`/product-category?${urlFormat}`, { replace: true });
    }
  }, [filterCategoryProduct, navigate]);

  // Handle category selection
  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({ ...prev, [value]: checked }));
  };

  // Handle sorting of products
  const handleSortedProduct = (e) => {
    const { value } = e.target;
    setSortBy(value);
  };

  // Sort the data based on selected sorting method
  const sortedData = useMemo(() => {
    if (!sortBy) return data;
    const sorted = [...data];
    sorted.sort((a, b) =>
      sortBy === "asc" ? a.selling - b.selling : b.selling - a.selling
    );
    return sorted;
  }, [data, sortBy]);

  return (
    <div className="container mx-auto p-4">
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* Sidebar */}
        <div className="bg-slate-300 p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          <div>
            <h3 className="text-base uppercase text-violet-600 font-medium border-b pb-1 border-slate-400">
              Sort By
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  onChange={handleSortedProduct}
                  value="asc"
                />
                <label>Price: Low To High</label>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  onChange={handleSortedProduct}
                  value="dsc"
                />
                <label>Price: High To Low</label>
              </div>
            </form>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-base uppercase text-violet-600 font-medium border-b pb-1 border-slate-400">
              Category
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {ProductCategory.map((category, index) => (
                <div
                  className="flex items-center gap-4"
                  key={category.values + index}
                >
                  <input
                    type="checkbox"
                    name="category"
                    checked={selectCategory[category.values] || false}
                    value={category.values}
                    id={category.values}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={category.values}>{category.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Product Listing */}
        <div className="px-4">
          {loading ? (
            <div className="flex justify-center items-center">
              <img
                src={loadingImg}
                className="w-20 h-20 block mx-auto"
                alt="Loading..."
              />
            </div>
          ) : (
            <>
              <p>Search Results: {sortedData.length}</p>
              {sortedData.length > 0 && (
                <VerticalProductCard data={sortedData} loading={loading} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeProductCategory;
