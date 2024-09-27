import React, { useState } from "react";
import conatct from "../assets/contact.png";
import summaryApi from "../common";
import { toast } from "react-toastify";

const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(summaryApi.contactForm.url, {
        method: summaryApi.contactForm.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data), // Send form data in the request body
      });

      const responseData = await response.json();

      if (response.ok && responseData.message) {
        toast.success(responseData.message);
        setData({
          name: "",
          email: "",
          contact: "",
          message: ""
        });
      } else {
        toast.error(responseData.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to submit the form");
    }
  };

  return (
    <div className="container p-8">
      <div className="sm:pl-6 sm:pr-6 pl-0 pr-0">
        <h2 className="text-xl font-semibold">
          Mangala Moments Help Center | 24x7 Customer Care Support
        </h2>
        <p className="text-sm mt-1">
          At MangalaMoments, we want your special moments to be stress-free and
          pleasurable. In case of any queries, problems or concerns, our 24x7
          Customer Care Support is here to assist you. When booking for
          services, account management or tracking orders, you do not have to
          worry as we have our willing support team at your service. You can
          contact us with a phone call, via email or comfortable live chat and
          we will provide you with suitable assistance. Your happiness is what
          we strive for and we are here to help you in creating beautiful
          memories.
        </p>
      </div>
      <h1 className="text-center text-3xl font-medium my-5">Contact Us</h1>
      <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-between align-middle my-8 sm:mx-8 mx-0">
        <div className="w-full hidden mb-3 sm:mb-0 lg:w-1/3 lg:flex justify-center items-center align-middle">
          <img
            src={conatct}
            className="mix-blend-multiply w-full block mx-auto"
            alt="contactus Img"
          />
        </div>
        <div className="w-full mt-3 block sm:mt-0 lg:w-1/2">
          <form className="space-y-8" onSubmit={handleForm}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={handleOnChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Enter Your Name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="contact"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Phone
              </label>
              <input
                type="number"
                id="contact"
                name="contact"
                value={data.contact}
                onChange={handleOnChange}
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Let us know how we can help you"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows="6"
                name="message"
                value={data.message}
                onChange={handleOnChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center bg-slate-700 hover:bg-slate-800 transition-all text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Send message
            </button>
          </form>
        </div>
      </div>

      {/* accordian */}
      <div className="mt-10">
        <h3 className="font-medium text-xl mb-3">24/7 Customer Support</h3>
        <p>
          Timeliness is an important aspect, and this is why our Customer
          Support is available 24/7. It does not matter if it is day time or
          night; our resourceful professionals are always prepared to deal with
          your questions, find out fault and provide services when needed. Just
          give us a ring or send an email or start a live chat and we will
          provide you with an immediate solution. We know how to handle your
          problems and we are here for you.
        </p>
        <h3 className="font-medium text-xl mb-3 mt-3">
          Types and Topics of Support at MangalaMoments Help Center
        </h3>
        <p>
          Our Help Center was created in order to offer complete assistance on
          different issues so that you have a pleasant experience with
          MangalaMoments. Below is an outline of support types and topics we
          offer:
        </p>
        <h3 className="text-xl font-normal mb-2 mt-3">1. Booking Assistance</h3>
        <p>
          Step-by-step help for booking event services, venues, and vendors.
        </p>
        <p>
          Modifying or canceling existing bookings. Understanding pricing,
          packages, and offers.
        </p>
        <h3 className="text-xl font-normal mb-2 mt-3">2. Account Management</h3>
        <p>Creating and managing your MangalaMoments account.</p>
        <p>Updating personal information, payment methods, and preferences.</p>
        <p>Troubleshooting login or password issues.</p>
        <h3 className="text-xl font-normal mb-2 mt-3">
          3. Order and Delivery Tracking
        </h3>
        <p>
          Assistance with tracking the status of your service or product orders.
        </p>
        <p>Handling issues with deliveries or service timelines.</p>
        <p>Managing order cancellations or rescheduling.</p>
        <h3 className="text-xl font-normal mb-2 mt-3">
          4. Payment and Billing Support
        </h3>
        <p>Resolving payment issues and understanding billing cycles.</p>
        <p>Clarifying transaction statuses, refunds, and invoicing concerns.</p>
        <h3 className="text-xl font-normal mb-2 mt-3">5. Technical Support</h3>
        <p>Troubleshooting technical issues on the MangalaMoments platform.</p>
        <p>
          Assistance with app navigation, account access, and feature usage.
        </p>
      </div>
    </div>
  );
};

export default Contact;
