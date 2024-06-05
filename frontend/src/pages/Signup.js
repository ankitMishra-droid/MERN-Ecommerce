import React, { useState } from "react";
import loginIcon from "../assets/signup.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConformPassword, setShowConformPassword] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: ""
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

  const handleUploadPic = async(e) => {
    const file = e.target.files[0]

    const imagePic = await imageTobase64(file);
    console.log(imagePic)

    setData((preve) => {
      return{
        ...preve,
        profilePic: imagePic
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  console.log("login data: ", data)
  return (
    <section id="signup">
      <div className="mx-auto p-5 container">

        <div className="bg-white p-2 py-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcon} alt="loginGif" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-slate-200 pb-4 pt-2 text-center absolute bottom-0 w-full bg-opacity-80 cursor-pointer">
                  Upload Photo
                </div>
                <input type="file" onChange={handleUploadPic} className="hidden"/>
              </label>
            </form>
          </div>

          <form className="pt-10 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name: </label>
              <div className="bg-slate-100 p-2">
                <input type="text" placeholder="Enter your name" id="name" name="name" value={data.name} className="w-full h-full outline-none bg-transparent p-2" onChange={handleOnChange}/>
              </div>
            </div>
            
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
            </div>

            <div className="">
              <label>Confirm Password: </label>
              <div className="bg-slate-100 p-2 flex">
                <input type={showConformPassword ? "text" : "password" } placeholder="Enter your password" id="confirmPassword" name="confirmPassword" value={data.confirmPassword} className="w-full h-full outline-none bg-transparent p-2" onChange={handleOnChange}/>
                <div className="cursor-pointer text-xl p-2" onClick={() => setShowConformPassword((preve) => !preve)}>
                  {
                    showConformPassword ? ( 
                      <FaEyeSlash /> 
                    ) : 
                    ( 
                      <FaEye /> 
                    )
                  }
                </div>
              </div>
            </div>

            <button className="w-full max-w-[150px] px-6 py-2 bg-slate-600 hover:scale-110 transition-all mx-auto block mt-8 text-white rounded-full">Sign Up</button>
          </form>
          
          <p className="my-5">Already have an account ? <Link to={"/login"} className="text-orange-500 hover:text-orange-600 hover:underline">Login</Link></p>

        </div>

      </div>
    </section>
  )
}

export default Signup
