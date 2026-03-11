import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";


const BankView = () => {

  const {id} = useParams();
  const [user , setUser] = useState(null);

  useEffect(()=>{
    
    const fetchUser = async () =>{
      try{
        const res = await fetch(`http://localhost:5000/api/admin/users/${id}`);
        const data = await res.json();

        setUser(data);

      }catch(error){
        console.log("Error fetching user", error);
      }
    };

    fetchUser();

  },[id])

  return (
    <div className="min-h-screen w-full flex z-10">
      
      {/* Left Image Section */}
      <div className="hidden sm:flex md:w-1/3 items-center justify-center bg-black">
        <img
          src="/image.png"
          alt="img"
          className="h-full w-full object-cover"
          style={{ objectPosition: "79% 45%" }}
        />
      </div>

      {/* Right Content Section */}
      <div className="w-full md:w-2/3 flex justify-center items-start bg-white px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24">
        
        <div className="bg-emerald-400 rounded-2xl w-full sm:w-[420px] md:w-[520px] lg:w-[650px] p-4 sm:p-6 my-6">

          {/* Profile */}
          <div className="flex justify-center my-6 sm:my-10 mb-2">
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt="profilePic"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full text-red-500 flex items-center justify-center text-3xl bg-white">
                {user?.name?.charAt(0)}
              </div>
            )}
          </div>

          <h3 className="text-center font-semibold font-serif text-lg sm:text-xl">
            {user?.name?.toUpperCase()}
          </h3>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 font-semibold font-sans">
            
            <div className="p-2 sm:p-4 text-center break-words">
              <p>Email</p>
              <p className="text-emerald-800 text-sm sm:text-base">
                {user?.email}
              </p>
            </div>

            <div className="p-2 sm:p-4 text-center">
              <p>User Name</p>
              <p className="text-emerald-800 text-sm sm:text-base">
                {user?.username}
              </p>
            </div>

            <div className="p-2 sm:p-4 text-center break-words">
              <p>Address</p>
              <p className="text-emerald-800 text-sm sm:text-base">
                {user?.address}
              </p>
            </div>

            <div className="p-2 sm:p-4 text-center">
              <p>DOB</p>
              <p className="text-emerald-800 text-sm sm:text-base">
                {user?.dob}
              </p>
            </div>

            <div className="p-2 sm:p-4 text-center">
              <p>Age</p>
              <p className="text-emerald-800 text-sm sm:text-base">
                {user?.age}
              </p>
            </div>

            <div className="p-2 sm:p-4 text-center">
              <p>Phone Number</p>
              <p className="text-emerald-800 text-sm sm:text-base">
                {user?.phone}
              </p>
            </div>

            <div className="p-2 sm:p-4 text-center">
              <p>Aadhar</p>
              <p className="text-emerald-800 text-sm sm:text-base">
                {user?.aadhar}
              </p>
            </div>

            <div className="p-2 sm:p-4 text-center">
              <p>Pan</p>
              <p className="text-emerald-800 text-sm sm:text-base">
                {user?.pan}
              </p>
            </div>

            <div className="p-2 sm:p-4 text-center">
              <p>Account Number</p>
              <p className="text-emerald-800 text-sm sm:text-base">
                {user?.accountNumber}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BankView;

