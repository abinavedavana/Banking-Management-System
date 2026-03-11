import { useEffect, useState } from "react";
import axios from "axios";

const BankDashboard = () => {

  const [usersCount , setUsersCount] = useState(0);

  useEffect(()=>{

    const fetchUsers = async () => {
      try{
        const token = localStorage.getItem("adminToken");

        const res = await axios.get(
          "http://localhost:5000/api/admin/users",
          {
            headers:{Authorization:`Bearer ${token}`}
          }
        );
        setUsersCount(res.data.totalUsers);
      }catch(error){
        console.log("Error fetching users",error);
      }
    };

    fetchUsers()

  },[]);

  return (
    <div className="relative w-full h-screen overflow-hidden">

      <img
        src="/image.png"
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute top-24 left-4 sm:left-10 lg:left-20 w-[420px] h-[520px] origin-top-left scale-[0.6] sm:scale-[0.8] lg:scale-100">

        <img
          src="/bank-img.png"
          alt=""
          className="absolute w-52 h-52 top-0 left-0 rounded-2xl"
        />


        <div className="absolute bg-cyan-900 w-52 h-52 top-28 left-28 rounded-2xl z-10 flex flex-col items-center justify-center text-center">
            <h2 className="text-xl font-serif font-bold items-center">No. of Users</h2>
            <p className="text-3xl font-sans font-bold mt-2 ">{usersCount}</p>
        </div>


        <img
          src="/bank-img.png"
          alt=""
          className="absolute w-52 h-52 top-56 left-56 rounded-2xl"
        />
      </div>
    </div>

  );
};

export default BankDashboard;
