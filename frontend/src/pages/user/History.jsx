import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

const History = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No auth token found");

        const res = await fetch(
          `${API}/api/transactions/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to fetch");
        }

        const data = await res.json();

        setTransactions(data);
      } catch (error) {
        toast.error("Failed to fetch history: " + error.message);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="relative min-h-screen w-full pt-20">
      
      <img
        src="/image.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gray-900/70"></div>

      
      <div className="relative z-10 flex justify-center px-4 sm:px-8 pb-16">
        <div className="bg-emerald-400 rounded-2xl w-full max-w-5xl p-4 sm:p-10 shadow-xl">

          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
            Transaction History
          </h2>

          
          <div className="hidden sm:grid grid-cols-5 font-semibold border-b border-black pb-2 mb-4">
            <p>Date</p>
            <p>Time</p>
            <p>Details</p>
            <p>Amount</p>
            <p>Balance</p>
          </div>

          {transactions.length === 0 ? (
            <p className="text-center text-gray-800 mt-10">
              No Transactions Found
            </p>
          ) : (
            transactions.map((tx, index) => (
              <div
                key={index}
                className="border-b border-black py-3 sm:grid sm:grid-cols-5 sm:items-center sm:text-sm"
              >
                {/* MOBILE VIEW */}
                <div className="sm:hidden space-y-1 text-sm">
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold">Time:</span>{" "}
                    {new Date(tx.createdAt).toLocaleTimeString()}
                  </p>
                  <p>
                    <span className="font-semibold">Type:</span>{" "}
                    <span
                      className={
                        tx.type === "Credit"
                          ? "text-blue-800 font-semibold"
                          : tx.type === "Transfer"
                          ? "text-orange-900 font-semibold"
                          : tx.type === "Received"
                          ? "text-fuchsia-800 font-semibold"
                          : "text-red-700 font-semibold"
                      }
                    >
                      {tx.type}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Amount:</span> ₹{tx.amount}
                  </p>
                  <p>
                    <span className="font-semibold">Balance:</span>{" "}
                    ₹{tx.balanceAfter ?? "-"}
                  </p>
                </div>

                {/* DESKTOP VIEW */}
                <div className="hidden sm:block">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </div>

                <div className="hidden sm:block">
                  {new Date(tx.createdAt).toLocaleTimeString()}
                </div>

                <div
                  className={`hidden sm:block font-semibold ${
                    tx.type === "Credit"
                      ? "text-blue-800"
                      : tx.type === "Transfer"
                      ? "text-orange-900"
                      : tx.type === "Received"
                      ? "text-fuchsia-800"
                      : "text-red-700"
                  }`}
                >
                  {tx.type}
                </div>

                <div className="hidden sm:block">₹{tx.amount}</div>

                <div className="hidden sm:block">
                  ₹{tx.balanceAfter ?? "-"}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default History;