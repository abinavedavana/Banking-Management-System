import { Bell, LogOut, Menu, User, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)

  const user = JSON.parse(localStorage.getItem("currentUser") || null);
  const firstLetter = user?.name?.charAt(0)?.toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token")
    toast.success("LogOut Successful")
    navigate("/");
  };

  return (
    <>
      <div className="bg-emerald-400 h-16 px-6 flex justify-between items-center w-full fixed top-0 left-0 z-50">

        <Link to="/profile" className="flex items-center">
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border border-white"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-white text-red-500 flex items-center justify-center font-bold text-lg">
              {firstLetter ? firstLetter : <User />}
            </div>
          )}
        </Link>

        
        <Link to="/dashboard" className="font-semibold text-lg">
          Home
        </Link>

        
        <div className="flex items-center gap-4">

          
          <Link to="/notifications">
            <Bell className="w-6 h-6" />
          </Link>

          <div className="hidden sm:flex items-center gap-6 font-semibold">
            <Link to="/deposit">Deposit</Link>
            <Link to="/withdraw">Withdrawal</Link>
            <button onClick={handleLogout}>
              <LogOut className="w-6 h-6 hover:text-red-700 hover:scale-95" />
            </button>
          </div>

          
          <button onClick={() => setOpen(!open)} className="sm:hidden">
            {open ? <X /> : <Menu />}
          </button>

        </div>
      </div>

      {
        open && (
          <div className="fixed top-16 left-0 w-full bg-emerald-300 sm:hidden z-[998] shadow-lg">
            <div className="flex flex-col gap-4 p-4 font-semibold">
              <Link to="/deposit" onClick={()=>setOpen(false)}>
                Deposit
              </Link>

              <Link to="/withdraw" onClick={()=> setOpen(false)}>
                Withdrawal
              </Link>

              <button onClick={handleLogout}>
                <LogOut className="w-6 h-6 hover:text-red-700 hover:scale-95" />
              </button>


            </div>
          </div>
        )
      }

      <Outlet />
    </>
  );
};

export default Navbar;

