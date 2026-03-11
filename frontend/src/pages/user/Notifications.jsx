import axios from "axios";
import { useEffect, useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/notifications",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Background Image */}
      <div className="relative min-h-screen w-full">
        <img
          src="/image.png"
          alt="bg"
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 top-0 w-full h-screen bg-gray-700/70"></div>

      {/* Main Card */}
      <div className="w-full absolute top-10 inset-0 flex justify-center items-center px-4 sm:px-8">
        <div className="bg-emerald-400 rounded-2xl w-full sm:w-[420px] md:w-[520px] lg:w-[650px] max-h-[80vh] overflow-y-auto">
          
          <div className="px-6 sm:px-10 md:px-16 py-8">
            
            <h4 className="text-2xl font-serif font-semibold mb-6 text-center">
              Notifications
            </h4>

            {notifications.length === 0 ? (
              <p className="text-center font-medium opacity-80">
                No notifications
              </p>
            ) : (
              <div className="space-y-4">
                {notifications.map((n) => (
                  <div
                    key={n._id}
                    className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-md hover:scale-[1.02] hover:bg-white/60 transition"
                  >
                    <p className="font-semibold text-gray-800">
                      {n.message}
                    </p>
                    <small className="text-gray-700 opacity-75">
                      {new Date(n.createdAt).toLocaleString()}
                    </small>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;