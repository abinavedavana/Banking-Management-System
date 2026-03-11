import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Users = () => {

  const navigate = useNavigate();
  const [users , setUsers] = useState([]);
  const [search , setSearch] = useState("");

  useEffect(()=>{

    const fetchUsers = async () =>{
      try{
        const token = localStorage.getItem("adminToken");

        const res = await  fetch("http://localhost:5000/api/admin/users",{
          headers:{Authorization:`Bearer${token}`}
        });

        const data = await res.json();

        setUsers(data.users);

    }catch(error){
      console.log("Error fetching users",error)
    }
  };

  fetchUsers()

  },[]);

  const filteredUser = users.filter((user)=>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (user) =>{
    localStorage.setItem("selectedUser",JSON.stringify(user))
    navigate(`/bank/users/view/${user._id}`)
  }

  const handleHistory = (user) =>{
    localStorage.setItem("selectedUser",JSON.stringify(user))
    navigate("/bank/users/history")
  }

  return (
     <div className="min-h-screen w-full flex z-10">

     
      <div className="hidden sm:flex md:w-1/3 items-center justify-center bg-black">
        <img
          src="/image.png"
          alt="img"
          className="h-full w-full object-cover"
          style={{ objectPosition: "79% 45%" }}
        />
      </div>

    
      <div className="w-full  md:w-2/3 justify-center bg-white px-6 pt-2">
        <div className="bg-emerald-400 flex justify-center items-center gap-6 rounded-lg p-6 max-h-4 sm:p-8 w-full mt-16 ">

         <Search className='w-8 h-8'/>

         <input 
         type="search"
         value={search}
         onChange={(e)=> setSearch(e.target.value)}
         placeholder='Search User by Name'
         className='bg-transparent placeholder:text-gray-700 font-semibold outline-none w-full' 
         />    

        </div>


        <div className="grid grid-cols-3 px-6 py-3 font-semibold border-b  border-gray-600  text-gray-700">
          <p className='col-span-2 text-center' >User Name</p>
          <p className="">View more</p>
        </div>

        {
          filteredUser.length === 0 ?(
            <p className='text-center text-gray-500 mt-10'>
              NO users found
            </p>
          ) : (
            filteredUser.map((user , index) =>(
              <div key={index}
                className='grid grid-cols-3 items-center px-6 py-4 border-b border-gray-400'>

                    <img 
                      src={user.profilePic || "/default-user.png"} 
                      alt="profilePic"
                      className='w-10 h-10 rounded-full object-cover' 
                      />

                      <p className='uppercase font-medium'>{user.name}</p>

                      <div className='flex justify-center gap-5'>

                        <button onClick={() => handleView(user)}
                          className='bg-emerald-400 px-4 py-2 text-sm text-white font-semibold  rounded-lg hover:bg-emerald-600  active:scale-90'>
                          View
                        </button>

                        <button onClick={() => handleHistory(user)}
                          className='bg-emerald-400 px-4 py-2 text-sm text-white font-semibold rounded-lg hover:bg-emerald-600  active:scale-90'>
                          History
                        </button>

                      </div>
               </div>
            ))
          )
        }
        
      </div>
    </div>
  )
}

export default Users
