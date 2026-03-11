import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("withdraw");
  const [receiverAccount, setReceiverAccount] = useState("");

  const user = JSON.parse(localStorage.getItem("currentUser"));

  async function onSubmit() {

    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try{
      const token = localStorage.getItem("token");

      let response;

      if(transactionType === "withdraw"){

        response = await axios.post("http://localhost:5000/api/transactions/withdraw",{
          amount: Number(amount)
        },{
          headers:{ Authorization:`Bearer ${token}`}
        });

      }else{

        response = await axios.post("http://localhost:5000/api/transactions/transfer",{
          amount: Number(amount),
          accountNumber:receiverAccount
        },{
          headers: { Authorization: `Bearer ${token}`}
        });
      }

      const updatedUser = {
        ...user,
        balance: response.data.balance,
      };

      localStorage.setItem("currentUser",JSON.stringify(updatedUser));

      if(transactionType === "withdraw"){
        toast.success("Money withdraw sucessfully")
      }else{
      toast.success("Money transferred successfully");
      }
      setAmount("");
      setReceiverAccount("");

    }catch(error){
      toast.error(error.response?.data?.message || " Transaction failed")
    }
  }

  return (
    <div>
    
      <div className="relative min-h-screen w-full ">
        <img
          src="/image.png"
          alt="img"
          className="w-full h-screen object-cover"
        />
      </div>
      <div className="absolute inset-0 top-0 w-full h-screen bg-gray-700/70"></div>

      <div className="w-full md:w-1/2 absolute inset-0 flex justify-center items-center px-4 sm:px-8">
        <div className="bg-emerald-400 rounded-2xl w-full sm:w-[420px] md:w-[520px] lg:w-[650px]">
          <div className="px-6 sm:px-10 md:px-16 py-8">
            <h4 className="text-2xl font-serif font-semibold mb-4 text-center">
              Transaction
            </h4>

            {/* Transaction Type */}
            <div className="mb-6">
              <label className="mr-4 font-semibold">
                <input
                  type="radio"
                  value="withdraw"
                  checked={transactionType === "withdraw"}
                  onChange={() => setTransactionType("withdraw")}
                />{" "}
                Withdraw
              </label>

              <label className="font-semibold">
                <input
                  type="radio"
                  value="transfer"
                  checked={transactionType === "transfer"}
                  onChange={() => setTransactionType("transfer")}
                />{" "}
                Transfer
              </label>
            </div>

            <h3 className="font-semibold">Account No :</h3>
            <p className="opacity-75">{user.accountNumber}</p>


            {transactionType === "transfer" && (
              <>
                <h3 className="font-semibold mt-4">
                  Receiver Account No
                </h3>
                <input
                  type="text"
                  value={receiverAccount}
                  onChange={(e) =>
                    setReceiverAccount(e.target.value)
                  }
                  placeholder="Enter Receiver Account No"
                  className="bg-transparent outline-none p-2 placeholder-gray-700/75"
                />
              </>
            )}

            <h3 className="font-semibold mt-4">Amount</h3>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              className="bg-transparent outline-none p-2 placeholder-gray-700/75"
            />
          </div>

          <div
            onClick={onSubmit}
            className="bg-white/55 px-4 py-2 m-6 rounded-lg font-semibold text-center hover:bg-gray-500 active:scale-95 cursor-pointer transition-transform"
          >
            <button>
              {transactionType === "withdraw"
                ? "Withdraw"
                : "Transfer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;