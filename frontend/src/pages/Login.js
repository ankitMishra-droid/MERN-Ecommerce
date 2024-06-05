import React, { useState } from "react";
import loginIcon from "../assets/login.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const handleOnChange = (e) => {
    const {name, value} = e.target;

    setData((prevData) => {
      return{
          ...prevData,
        [name]: value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  console.log("login data: ", data)

  return (
    <section id="login">
      <div className="mx-auto p-5 container">

        <div className="bg-white p-2 py-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcon} alt="loginGif" />
          </div>

          <form className="pt-10" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email: </label>
              <div className="bg-slate-100 p-2">
                <input type="email" placeholder="Enter your email" id="email" name="email" value={data.email} className="w-full h-full outline-none bg-transparent p-2" onChange={handleOnChange}/>
              </div>
            </div>

            <div className="">
              <label>Password: </label>
              <div className="bg-slate-100 p-2 flex">
                <input type={showPassword ? "text" : "password" } placeholder="Enter your password" id="password" name="password" value={data.password} className="w-full h-full outline-none bg-transparent p-2" onChange={handleOnChange}/>
                <div className="cursor-pointer text-xl p-2" onClick={() => setShowPassword((preve) => !preve)}>
                  {
                    showPassword ? ( 
                      <FaEyeSlash /> 
                    ) : 
                    ( 
                      <FaEye /> 
                    )
                  }
                </div>
              </div>
              <Link to={"/forgot-password"} className="block w-fit ml-auto hover:underline hover:text-orange-500">Forgot Password</Link>
            </div>

            <button className="w-full max-w-[150px] px-6 py-2 bg-slate-600 hover:scale-110 transition-all mx-auto block mt-8 text-white rounded-full">Login</button>
          </form>
          
          <p className="my-5">Don't have an account? <Link to={"/signup"} className="text-orange-500 hover:text-orange-600 hover:underline">Sign Up</Link></p>

        </div>

      </div>
    </section>
  );
};

export default Login;
