import { Upload,  } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

const Register = () => {

  const navigate = useNavigate();

      const [formData , setFormData] = useState({
      name: "",
      username: "",
      email: "",
      address: "",
      phone: "",
      age: "",
      dob: "",
      aadhar: "",
      pan: "",
      password:"",
      confirmPassword:"",
      initialAmount:"",
      bankName:"Horizon Bank",
      branch:"Calicut",
      ifsc:"HORZB14145",
      accountNo:"XXXX XXXX XXXX 1234",
      profilePic:"",
      transactions:[],
    });


  const [preview , setPreview] = useState(null);

  function handleChange(e){
    const {name , value} = e.target;
    setFormData((prev) => ({...prev, [name]:value}));
  }

  
  function handleImageUpload(e){
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setPreview(imageURL);
    setFormData((prev)=> ({...prev, profilePic:imageURL}))
  }

  async function handleRegister(){

    if(!formData.name || !formData.username || !formData.password || !formData.initialAmount){
      toast.error("Please fill all requried fields");
      return;
    }

    if(formData.password !== formData.confirmPassword){
      toast.error("password do not match");
      return;
    }

    try{

      //registration
      await axios.post(`${API}/api/users/register`, {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        phone: formData.phone,
        age: formData.age,
        dob: formData.dob,
        aadhar: formData.aadhar,
        pan: formData.pan,
        profilePic: formData.profilePic,
      });

      //login to get token
      const loginRes = await axios.post(`${API}/api/users/login`,{
        identifier: formData.username,
        password: formData.password,
      })

      const token = loginRes.data.token;

      //deposit initial ammount
      await axios.post(`${API}/api/transactions/deposit`,{
        amount: Number(formData.initialAmount),
      },{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });

      toast.success("Registration and Initial Deposit Successfull")

      navigate("/");

    }catch(error){
      toast.error(error.response?.data?.message || "Registration failed");
    }
   
  }


  return (
    <div className='min-h-screen w-full flex gap-10'>
      <div className='hidden md:flex w-1/3 items-center justify-center bg-black/75'>
        <img
          src="/image.png"
          alt="img"
          className="h-full w-full object-cover"
          style={{ objectPosition: "79% 45%" }}
        />
      </div>

      <div className='w-full md:w-2/3  items-center justify-center bg-white m-10 '>
        <div className='bg-emerald-400 rounded-lg p-2 sm:p-4  max-w[00px] '>

          <h1 className='text-2xl font-serif font-bold pb-8 pt-6 text-center'>
            Register
          </h1>

          <div className='w-full grid grid-cols-1 sm:grid-cols-2 '>
            <div className='mb-4'>
              <label className='block text-md mb-1'>Name</label>
              <input 
                type="text"
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
                />
            </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>Username</label>
              <input 
                type="text"
                name='username'
                value={formData.username}
                onChange={handleChange}
                required
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
                />
            </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>Address</label>
              <textarea 
                type="text"
                name='address'
                value={formData.address}
                onChange={handleChange}
                required
                className='w-3/4 bg-transparent border border-black focus:outline-none'
                />
            </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>Email</label>
              <input 
                type="email"
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
                />
            </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>Phone Number</label>
              <input 
                type="number"
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                required
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
                />
            </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>Aadhar Number</label>
              <input 
                type="number"
                name='aadhar'
                value={formData.aadhar}
                onChange={handleChange}
                required
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
                />
            </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>Age</label>
              <input 
                type="number"
                name='age'
                value={formData.age}
                onChange={handleChange}
                required
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
                />
            </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>Pancard Number</label>
              <input 
                type="text"
                name='pan'
                value={formData.pan}
                onChange={handleChange}
                required
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
                />
            </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>Initial Amount</label>
              <input 
                type="number"
                name='initialAmount'
                value={formData.initialAmount}
                onChange={handleChange}
                required
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
                />
            </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>DOB</label>
              <input 
                type="date"
                name='dob'
                value={formData.dob}
                onChange={handleChange}
                required
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
                />
            </div>

           <div className='mb-4'>
              <label className='block text-md mb-1'>Password</label>
              <input 
                type="password"
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
                />
            </div>

            <div className='mt-6 mb-6'> 
               <label className='flex gap-2 items-center justify-center'>
                <Upload size={24}/> Upload Image
                <input 
                  type="file"
                  accept='image/*'
                  className='hidden'
                  onChange={handleImageUpload} 
                  />
                </label>

                {
                  preview && (
                    <div>
                      <img 
                      src={preview}
                      alt="preview"
                      className='w-20 h-20 rounded-full object-cover border' />
                    </div>
                  )
                }
             </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>Confirm Password</label>
              <input 
                type="password"
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
                />
            </div>

          </div>

          <div className='flex justify-center items-center'>
            <button onClick={handleRegister} 
                className=" font-semibold bg-gray-100 rounded-full px-20 py-2 hover:bg-blue-400 active:scale-95 transition mb-6 mt-6 justify-center items-center ">
              Register
            </button>
          </div>

          <p className='text-sm text-center  mb-4'>
            Already have an account? {" "}
            <Link to="/"
            className='font-semibold hover:underline'>
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Register;
