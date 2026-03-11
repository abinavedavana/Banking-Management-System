import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {

  const user = JSON.parse(localStorage.getItem("currentUser"));

  if(!user){
    return <div>Please login first</div>
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
      <div className="absolute inset-0 top-0 w-full h-screen bg-gray-700/70"></div>
      <div className="absolute inset-0 top-20 flex justify-around items-start px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl text-white font-serif font-bold">
          Horizon Bank
        </h2>

        <h2 className="hidden sm:block text-xl sm:text-2xl md:text-3xl text-white font-serif font-bold">
          Horizon Bank
        </h2>

        <h2 className="hidden md:block text-xl sm:text-2xl md:text-3xl text-white font-serif font-bold">
          Horizon Bank
        </h2>
      </div>

      <div className=" w-full md:w-1/2 absolute inset-0 flex justify-center items-center px-4 sm:px-8">
        <div className=" bg-emerald-400 rounded-2xl w-full sm:w-[420px] md:w-[520px] lg:w-[650px]">
          <div className="px-6 sm:px-10 md:px-16 py-8">
            <h4 className="text-lg sm:text-xl font-serif font-semibold mb-4 text-center">
              Account Number
            </h4>

            <p className="tracking-widest text-sm sm:text-base font-mono my-4 text-center ">
              {user.accountNumber}
            </p>

            <h3 className="text-lg sm:text-xl font-serif font-semibold mt-6 mb-2 text-center">
              Available Balance
            </h3>

            <p className="tracking-widest text-base sm:text-lg font-mono my-4 text-center ">
              {user.balance}
            </p>
          </div>

          <div className="flex justify-between px-6 sm:px-10 md:px-16 pb-6">
            <button className="text-blue-900 font-semibold hover:underline">
              <Link to="/history">History</Link>
            </button>

            <button className="text-blue-900 font-semibold hover:underline">
              <Link to="/home1">More</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
