import  { useState ,useEffect } from 'react'
import { Edit, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL;

const Profile = () => {

  const [user , setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try{

        const token = localStorage.getItem("token");
        const res = await fetch(`${API}/api/users/profile`,{
          headers: {
            Authorization : `Bearer ${token}`
          },
        });

        const data = await res.json();

        if(!res.ok) throw new Error(data.message);
        setUser(data);

      }catch(error){
        console.error("Profile fetch failed",error.message);
      }
    };

    fetchProfile();
  },[])

  return (
    <div>
      <div className="relative min-h-screen w-full ">
        <img
          src="/image.png"
          alt="img"
          className="  w-full h-screen object-cover"
        />
      </div>
      <div className="absolute bg-gray-700/70"></div>


      <div className="w-full md:w-1/2 absolute z-10 top-16 inset-x-0 bottom-0 flex justify-center items-start md:items-center px-4 sm:px-8 overflow-y-auto">
        <div className="bg-emerald-400 rounded-2xl w-full sm:w-[420px] md:w-[520px] lg:w-[650px] p-6 my-6">
          <div className='flex justify-center mb-2'>
            {
              user?.profilePic ? (
                <img 
                src={user.profilePic} 
                alt="profile"
                className='w-24 h-24 rounded-full object-cover' />
              ) : (
                <div className='w-24 h-24 rounded-full text-red-500 flex items-center justify-center text-3xl bg-white'>
                  {user?.name?.charAt(0) || <User/>}
                </div>
              )
            }
          </div>
          <h3 className='text-center font-semibold font-serif'>
            {user?.name.toUpperCase()}
          </h3>

          <div className='gird grid-col-1  justify-around font-semibold font-sans sm:grid grid-cols-2'>

            <div className='p-4 text-center break-words '>
              <p>Email</p>
              <p className="text-emerald-800">{user?.email}</p>
            </div>

            <div className='p-4 text-center'>
              <p>User Name</p>
              <p className="text-emerald-800">{user?.username}</p>
            </div>

            <div className='p-4 text-center break-words'>
              <p>Address</p>
              <p className="text-emerald-800">{user?.address}</p>
            </div>

            <div className='p-4 text-center'>
              <p>DOB</p>
              <p className="text-emerald-800">{user?.dob}</p>
            </div>

            <div className='p-4 text-center'>
              <p>Age</p>
              <p className="text-emerald-800">{user?.age}</p>
            </div>

            <div className='p-4 text-center'>
              <p>Phone Number</p>
              <p className="text-emerald-800">{user?.phone}</p>
            </div>

            <div className='p-4 text-center'>
              <p>Aadhar</p>
              <p className="text-emerald-800">{user?.aadhar}</p>
            </div>

            <div className='p-4 text-center'>
              <p>Pan </p>
              <p className="text-emerald-800">{user?.pan}</p>
            </div>

          </div>

          <div className='flex justify-end'>
            <button className='bg-white  p-1 rounded-xl  hover:text-rose-700 active:scale-90 transition-transform'>
              <Link to="/edit-profile"> <Edit/> </Link>
            </button>
          </div>



        </div>
      </div>
    </div>
  )
}

export default Profile