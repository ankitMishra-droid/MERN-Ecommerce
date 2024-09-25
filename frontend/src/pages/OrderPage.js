import React, { useEffect, useState } from "react";
import summaryApi from "../common";
import moment from "moment";

const OrderPage = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(summaryApi.getAllOrders.url, {
        method: summaryApi.getAllOrders.method,
        credentials: "include",
      });

      const responseData = await response.json();

      setData(responseData.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center mt-5">
        {/* Check if there are no orders */}
        {data.length === 0 && <p>No Order Found.</p>}
      </div>

      <div>
        {/* Map through data only if it's an array */}
        {Array.isArray(data) &&
          data.map((items, index) => {
            return (
              <>
                <div className="" key={"index1"+index}>
                  <p className="text-start px-5">
                    <span className="text-xl font-semibold">Order Date:</span>{" "}
                    <span>
                      {moment(items.createdAt).format("MMMM Do YYYY")}
                    </span>
                  </p>
                  <p className="text-start px-5">
                    <span className="text-xl font-semibold">Order Time:</span>{" "}
                    <span>{moment(items.createdAt).format("hh:mm:ss a")}</span>
                  </p>
                </div>
                <div key={"index2"+index}>
                  {items.productDetails.map((item, index) => {
                    return (
                      <div>
                        <img src={item.image} className="w-30 h-20" alt="" />
                        <p>{item.name}</p>
                      </div>
                    );
                  })}
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default OrderPage;
