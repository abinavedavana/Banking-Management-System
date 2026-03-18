
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL;

function Deposit() {

  const [amount , setAmount] = useState("")

  const user = JSON.parse(localStorage.getItem("currentUser"));

  async function onSubmit(){

    if(!amount || amount <= 0){
      toast.error("Please enter a valid amount")
      return;
    }

    try{
      const token = localStorage.getItem("token");

      const response = await axios.post(`${API}/api/transactions/deposit`,{
        amount:Number(amount)
      },{
        headers:{Authorization:`Bearer ${token}`}
      });

      const updatedUser = {
        ...user,
        balance: response.data.balance,
      };

      localStorage.setItem("currentUser",JSON.stringify(updatedUser));
      toast.success("Amount deposited successfully");
      setAmount("");

    }catch(error){
      toast.error(error.response?.data?.message || "Deposit failed");
    }


  }

  return (
    <div>
      <div className="relative min-h-screen w-full ">
        <img
          src="/image.png"
          alt="img"
          className=" w-full h-screen object-cover"
        />
      </div>
      <div className="absolute inset-0 top-0 w-full h-screen bg-gray-700/70 "></div>


      <div className=" w-full md:w-1/2 absolute inset-0 flex justify-center items-center px-4  sm:px-8">
        <div className=" bg-emerald-400 rounded-2xl w-full sm:w-[420px] md:w-[520px] lg:w-[650px]">
          <div className="px-6 sm:px-10 md:px-16 py-8">
            <h4 className="text-2xl font-serif font-semibold mb-4 text-center">
              Deposit
            </h4>

            <h3 className="text-lg sm:text-xl font-serif font-semibold pt-10 mb-2">
              Account No :
            </h3>

            <p className="tracking-widest text-base sm:text-lg font-mono my-4 opacity-75 text-left">
              {user.accountNumber}
            </p>

            <h3 className="text-lg sm:text-xl font-serif font-semibold mt-6 mb-2">
              Branch
            </h3>

            <p className="tracking-widest text-base sm:text-lg font-mono my-4  opacity-75 text-left">
              {user.branch}
            </p>

            <h3 className="text-lg sm:text-xl font-serif font-semibold mt-6 mb-2">
              Amount 
            </h3>

            <input 
            type="number"
            value={amount}
            onChange={(e)=> setAmount(e.target.value)}
            placeholder='Enter Amount'
            className="bg-transparent text-base  outline-none placeholder-gray-700/75  sm:text-lg font-mono p-2  text-left" 
            />

          </div>

          <div onClick={onSubmit} 
              className='bg-white/55 px-4 py-2 m-6 rounded-lg font-semibold felx justify-center items-center text-center hover:bg-gray-500 active:scale-95 cursor-pointer transition-transform'>
            <button  >
              Deposit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Deposit
