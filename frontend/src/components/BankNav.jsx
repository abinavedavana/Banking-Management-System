import { LogOut, Menu, X } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const BankNav = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("adminToken");
    toast.success("LogOut Successful")
    navigate("/bank");
  }

  return (
    <>
      <div className="bg-emerald-400 h-16 px-4 sm:px-8 fixed top-0 left-0 w-full z-20 flex items-center justify-end">

        <div className="hidden md:flex items-center gap-10 font-semibold">
          <Link to="/bank/dashboard">Home</Link>
          <Link to="/bank/users">View Users</Link>

          <button onClick={handleLogout}>
            <LogOut />
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="fixed top-16 left-0 w-full bg-emerald-300 md:hidden z-10">
          <div className="flex flex-col gap-4 p-4 font-semibold">
            <Link to="/bank/dashboard" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link to="/bank/users" onClick={() => setOpen(false)}>
              View Users
            </Link>

            <button onClick={handleLogout} className="flex items-center gap-2">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default BankNav;
