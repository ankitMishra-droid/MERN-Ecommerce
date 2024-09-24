/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/heading-has-content */
import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategorywiseProduct from "../helpers/fetchCategorywiseProduct";
import displayCurrency from "../helpers/displayCurrency";

import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(12).fill(null);

  const { fetchAddToCartCount } = useContext(Context);

  const handleCountUpdate = async (e, id) => {
    await addToCart(e, id);
    fetchAddToCartCount();
  };

  // const [scroll, setScroll] = useState(0)
  const scrollElement = useRef();

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategorywiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  const nextProduct = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const prevProduct = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container mx-auto my-6 relative">
      <h2 className="font-bold text-2xl">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        {/* <button
          onClick={prevProduct}
          className="shadow-md rounded-full text-white bg-black p-1 absolute left-0 z-10 hidden md:block"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextProduct}
          className="shadow-md rounded-full text-white bg-black p-1 absolute right-0 z-10 hidden md:block"
        >
          <FaChevronRight />
        </button> */}
        {loading ? (
          loadingList.map((product, index) => {
            return (
              <div
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
                key={index + "product"}
              >
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                <div className="p-4 grid w-full gap-2">
                  <h2 className="line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full"></h2>
                  <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                  <div className="flex gap-3 w-full">
                    <p className="text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                  </div>
                  <button className="text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              //   modules={[Pagination]}
              className="mySwiper"
              breakpoints={{
                220: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                440: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                1220: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {data.map((product, index) => {
                return (
                  <SwiperSlide key={product?._id + index}>
                    {/* <Link
                      to={"product/" + product?._id}
                      className="w-full h-auto shandow mt-10 mb-10 flex relative rounded-lg border border-gray-100 md:bg-white bg-slate-200 flex-col md:flex-row shadow-md mx-auto"
                    >
                      <span className="absolute z-10 top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                        {Math.round(
                          ((product?.productPrice - product?.selling) /
                            product?.productPrice) *
                            100
                        )}
                        % OFF
                      </span>
                      <div className="bg-slate-200 m-auto p-2 h-48 min-w-[120px] md:min-w-[145px]">
                        <img
                          src={product?.productImg[0]}
                          className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                          alt={product?.productImg + index}
                        />
                      </div>
                      <div className="p-4 flex flex-col justify-center items-center md:items-start">
                        <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                          {product?.productName}
                        </h2>
                        <p className="capitalize text-gray-500">
                          <span className="normal-case">
                            {product?.brandName}{" "}
                          </span>
                          {product?.category}
                        </p>
                        <div className="flex gap-3">
                          <span className="font-bold text-slate-900">
                            {displayCurrency(product?.selling)}
                          </span>
                          <span className="text-slate-900 line-through">
                            {displayCurrency(product?.productPrice)}
                          </span>
                        </div>
                        <button
                          className="flex mt-2 items-center justify-center rounded-md bg-slate-900 px-3 py-0.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                          onClick={(e) => handleCountUpdate(e, product?._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          Add to cart
                        </button>
                      </div>
                    </Link> */}

                    <Link
                      to={"product/" + product?._id}
                      className="block mx-auto"
                    >
                      <MDBContainer fluid className="my-5">
                        <MDBRow>
                          <MDBCol
                            md="12"
                            lg="4"
                            className="block bg-white mx-auto mb-4 mb-lg-0 rounded-lg px-3 shadow-lg shadow-slate-300 py-2 w-full h-3/4 md:w-10/12 lg:w-11/12"
                          >
                            <MDBCard>
                              <div className="flex justify-between p-3">
                                <p className="lead mb-0">{}</p>
                                <div
                                  className="bg-slate-500 rounded-full flex items-center justify-center"
                                  style={{ width: "35px", height: "35px" }}
                                >
                                  <p className="text-white mb-0 text-xs">
                                    {Math.round(
                                      ((product?.productPrice -
                                        product?.selling) /
                                        product?.productPrice) *
                                        100
                                    )}
                                    %
                                  </p>
                                </div>
                              </div>
                              <MDBCardImage
                                src={product?.productImg[0]}
                                position="top"
                                className="h-48 block mx-auto"
                                alt={product.productImg}
                              />
                              <MDBCardBody>
                                <div className="flex mt-3 justify-between mb-3">
                                  <p className="text-sm capitalize">
                                    <a href="#!" className="text-muted text-sm">
                                      {product.category}
                                    </a>
                                  </p>
                                  <p className="text-sm text-red-600">
                                    <s>{displayCurrency(product?.productPrice)}</s>
                                  </p>
                                </div>

                                <div className="flex justify-between mb-3">
                                  <h5 className="mb-0 text-ellipsis text-start line-clamp-1 font-bold">{product?.productName}</h5>
                                  <h5 className="text-dark mt-1 mb-0 pl-[2px] font-bold sm:mt-0">{displayCurrency(product?.selling)}</h5>
                                </div>

                                <div class="flex justify-between mb-2">
                                  <p class="text-muted mb-0">
                                    Available: <span class="fw-bold">6</span>
                                  </p>
                                  <div class="sm:ms-auto text-warning">
                                    <MDBIcon fas icon="star" />
                                    <MDBIcon fas icon="star" />
                                    <MDBIcon fas icon="star" />
                                    <MDBIcon fas icon="star" />
                                    <MDBIcon fas icon="star" />
                                  </div>
                                </div>

                                <button
                                  className="w-full my-5 flex items-center justify-center rounded-md bg-slate-900 px-3 py-0.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                  onClick={(e) =>
                                    handleCountUpdate(e, product?._id)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-2 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                  </svg>
                                  Add to cart
                                </button>
                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>
                        </MDBRow>
                      </MDBContainer>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </>
        )}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
