import React, { use, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
import { Shuffle } from 'lucide-react';
import { Link } from 'react-router-dom';

const BankLogin = () => {

  const navigate = useNavigate();

  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  async function handleLogin(){
    
    try{
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",{
          email:email,
          password:password,
        })

        //store token
        localStorage.setItem("adminToken",res.data.token);
        toast.success("Successfully Logged In");
        navigate("/bank/dashboard");
    }catch(error){
      toast.error(error.response?.data?.message || "Login Failed");
    }
  }

  return (
    <div className="min-h-screen w-full flex">

     
      <div className="hidden sm:flex md:w-1/3 items-center justify-center bg-black">
        <img
          src="/image.png"
          alt="img"
          className="h-full w-full object-cover"
          style={{ objectPosition: "79% 45%" }}
        />
      </div>

    
      <div className="w-full md:w-2/3 flex items-center justify-center bg-white px-4">
        <div className="bg-emerald-400 rounded-lg p-6 sm:p-8 w-full max-w-[400px] relative">

          <h1 className="text-2xl font-serif font-bold mb-10 pt-2 text-center">
            Bank Login
          </h1>

          <div className="mb-4">
            <label className="block text-md mb-1">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              required
              className="w-3/4 bg-transparent border-b border-black focus:outline-none focus:border-gray-700"
            />
          </div>

          
          <div className="mb-10">
            <label className="block text-md mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              required
              className="w-3/4 bg-transparent border-b border-black focus:outline-none focus:border-gray-700 "
            />
          </div>

          <div className="flex justify-center">
            <button  
              onClick={handleLogin}
              className="font-semibold bg-gray-100 rounded-full px-10 py-2 hover:bg-blue-400 active:scale-90 transition-transform mb-4">
              Login
            </button>
          </div>

          <div className='flex justify-end'>
            <button className='bg-white p-1 rounded-xl absolute bottom-3 right-3 hover:text-rose-700 active:scale-90 transition-transform'>
              <Link to="/"> <Shuffle/> </Link>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BankLogin
