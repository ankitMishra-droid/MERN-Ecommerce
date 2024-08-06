import React, { useState } from "react";
import summaryApi from "../common";
import { toast } from "react-toastify";
import Loader from "../assets/loader.gif";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText(true);

    try {
      const response = await fetch(summaryApi.forgotPasswordLink.url, {
        method: summaryApi.forgotPasswordLink.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        setMessage(responseData.message);
        setButtonText(false);
        setEmail("");
        // navigate("/password-reset")
        toast(responseData.message);
      } else {
        setMessage(responseData.message);
        setButtonText(false);
        toast(responseData.message);
      }
    } catch (error) {
      setMessage("Error sending password reset link.");
    }
  };
  return (
    <div className="w-full p-1 mt-6 bg-white flex justify-center flex-col items-center">
      <form onSubmit={handleSubmit}>
        {/* <div className='bg-slate-100 p-2'>
          <input type="email" name='email' placeholder='enter email' id='email' className='w-full h-full outline-none bg-transparent p-2 border-black' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div> */}
        <div class="grid gap-6 content-center justify-center  mb-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          {buttonText ? (
            <button
              disabled
              className="w-full rounded-md relative bg-indigo-500 py-1.5 font-medium text-white"
            >
              <span>Processing...</span>
              <img
                src={Loader}
                className="w-4 h-4 absolute top-[0.6rem] right-4"
                alt="loader"
              />
            </button>
          ) : (
            <button
              className="w-full rounded-md bg-indigo-500 py-1.5 font-medium text-white hover:bg-indigo-600"
            >
              Reset Password
            </button>
          )}
        </div>
      </form>
      {/* {message && <p className="mt-5 text-xl bg-orange-300 px-2">sent: {message}</p>} */}
    </div>
  );
};

export default ForgotPassword;
