
const Home1 = () => {

  const user = JSON.parse(localStorage.getItem("currentUser"))

  if(!user){
    return <div className="text-center mt-20 text-xl">Please login first</div>
  }

  return (
    <div>
      <div className="relative min-h-screen w-full ">
        <img
          src="/image.png"
          alt="img"
          className=" w-full h-screen object-cover"
        />
      </div>
      <div className="absolute inset-0 top-0 w-full h-screen bg-gray-700/70"></div>


      <div className=" w-full md:w-1/2 absolute inset-0 flex justify-center items-center px-4 sm:px-8">
        <div className=" bg-emerald-400 rounded-2xl w-full sm:w-[420px] md:w-[520px] lg:w-[650px]">
          <div className="px-6 sm:px-10 md:px-16 py-8">
            <h4 className="text-lg sm:text-xl font-serif font-semibold mb-4 text-center">
              Available Balance
            </h4>

            <p className="tracking-widest text-sm sm:text-base font-mono my-4 text-center">
              {user.balance}
            </p>

            <h3 className="text-lg sm:text-xl font-serif font-semibold pt-10 mb-2">
              Bank Name
            </h3>

            <p className="tracking-widest text-base sm:text-lg font-mono my-4 text-center opacity-75 sm:text-left">
              {user.bankName}
            </p>

            <h3 className="text-lg sm:text-xl font-serif font-semibold mt-6 mb-2">
              Branch
            </h3>

            <p className="tracking-widest text-base sm:text-lg font-mono my-4 text-center opacity-75 sm:text-left">
              {user.branch}
            </p>

            <h3 className="text-lg sm:text-xl font-serif font-semibold mt-6 mb-2">
              IFSC CODE
            </h3>

            <p className="tracking-widest text-base sm:text-lg font-mono my-4 text-center pb-10 opacity-75 sm:text-left">
              {user.ifsc}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home1
