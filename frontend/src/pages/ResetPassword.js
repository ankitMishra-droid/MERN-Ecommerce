import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import summaryApi from "../common";

const ResetPassword = () => {
  const { userId, token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${summaryApi.reserPassword.url}/${userId}/${token}`,
        {
          method: summaryApi.reserPassword.method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const result = await response.json();
      if (result.success) {
        setMessage(result.message);
        setTimeout(() => navigate("/login"), 3000); // Redirect to login after a few seconds
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage("Error resetting password.");
    }
  };

  return (
    <div className="mt-10 w-full block mx-auto">
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
        <div class="grid gap-6 content-center justify-center  mb-6">
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Set Password
            </label>
            <input
              type="passsword"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Password"
              required
            />
          </div>
          <div></div>
        </div>
        <div type="submit" className="flex justify-center items-center mt-8">
          <button className="w-full max-w-[150px] px-6 py-2 btn-24 transition-all mx-auto block mt-3">
            Reset
          </button>
        </div>
        {message && <p className="mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
