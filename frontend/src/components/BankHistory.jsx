import React, { useEffect, useState } from "react";

const BankHistory = () => {
  const [transactions, setTransactioins] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const selectedUser = JSON.parse(localStorage.getItem("selectedUser"));
      setUser(selectedUser);

      try {
        const res = await fetch(
          `http://localhost:5000/api/admin/transactions/${selectedUser._id}`,
        );

        const data = await res.json();
        setTransactioins(data);
      } catch (error) {
        console.log("Error fetching history", error);
      }
    };

    fetchHistory();
  }, []);

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
      <div className="w-full md:w-2/3 flex justify-center items-start bg-white px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24">
        <div className="bg-emerald-400 rounded-2xl w-full sm:w-[420px] md:w-[520px] lg:w-full p-4 sm:p-6 my-6">
          <div className="flex justify-start gap-10 my-6">
            <img
              src={user.profilePic}
              alt="profilePic"
              className="w-20 h-20 rounded-full object-cover"
            />
            <p className="text-xl uppercase font-medium flex justify-center items-center">
              {user.name}
            </p>
          </div>
          <hr className="border border-black" />
          <div className="grid grid-cols-5  font-semibold border-b border-black pb-2 mb-4">
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

export default BankHistory;
