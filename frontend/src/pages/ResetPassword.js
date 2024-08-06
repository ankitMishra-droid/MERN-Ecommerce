import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import summaryApi from "../common";
import Loader from "../assets/loader.gif";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { userId, token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText(true);
    try {
      const response = await fetch(
        `${summaryApi.reserPassword.url}/${userId}/${token}`,
        {
          method: summaryApi.reserPassword.method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const responseData = await response.json();
      if (responseData.success) {
        setMessage(responseData.message);
        setButtonText(false);
        toast(responseData.message)
        setPassword("")
        setTimeout(() => navigate("/login"), 3000); // Redirect to login after a few seconds
      } else {
        setMessage(responseData.message);
        toast(responseData.message)
        setButtonText(false);
      }
    } catch (error) {
      setMessage("Error resetting password.");
    }
  };

  return (
    <>
    <div className="mt-10 w-full p-1 bg-white flex justify-center flex-col items-center">
      <form onSubmit={handleSubmit}>
        {/* <div className="flex justify-center items-center">
          <label className="mx-3" htmlFor="password">Set Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="outline p-1 border- rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div> */}
        <div class="grid gap-6 content-center justify-center mb-2">
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Set Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Password"
              required
            />
          </div>
          <div></div>
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
              Save
            </button>
          )}
        </div>
      </form>
      {/* {message && <p className="mt-4">{message}</p>} */}
    </div>
      </>
  );
};

export default ResetPassword;
