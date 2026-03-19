

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

const EditProfile = () => {
  const navigate = useNavigate();

  const storeUser = JSON.parse(localStorage.getItem("currentUser"));

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    dob: "",
    phone: "",
    address: "",
    age: "",
    aadhar: "",
    pan: "",
    profilePic: "",
  });

  const [preview, setPreview] = useState(null);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setFormData({
        name: data.name || "",
        username: data.username || "",
        email: data.email || "",
        dob: data.dob ? data.dob.split("T")[0] : "",
        phone: data.phone || "",
        address: data.address || "",
        age: data.age || "",
        aadhar: data.aadhar || "",
        pan: data.pan || "",
        profilePic: null,
      });

      setPreview(data.profilePic || null);

      console.log("Profile pic from API:", data.profilePic);

    } catch (error) {
      toast.error( error.message || "Profile fetch failed");
    }
  };

  fetchProfile();
}, []);


  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, profilePic: file}));
  }



  async function handleUpdate() {
    try{
      const token = localStorage.getItem("token");

      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if(formData[key] && formData[key] !== ""){
          formDataToSend.append(key,formData[key]);
        }
      });

      const res = await fetch(`${API}/api/users/update-profile`,{
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await res.json();

      if(!res.ok) throw new Error(data.message);

      const profileRes = await fetch(`${API}/api/users/profile`,{
        headers: { Authorization: `Bearer ${token}`}
      });

      const updatedUser = await profileRes.json();
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      toast.success("Profile Updated successfully");
      navigate("/profile");

    }catch(error){
      toast.error(error.message);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <img
        src="/image.png"
        alt="img"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gray-700/70"></div>

      
      <div className="relative z-10">
        <div className="relative z-10 flex justify-center px-4 sm:px-8 pt-24 pb-16">
          <div className="bg-emerald-400 rounded-2xl w-full p-10 sm:w-[420px] md:w-[520px] lg:w-[650px]">
            <h4 className="text-2xl font-serif font-semibold mb-4 text-center">
              Edit Profile
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <div>
                <label className="block font-serif font-semibold mb-1.5">
                  Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full p-1.5 font-mono outline-none"
                />
              </div>

              <div>
                <label className="block font-serif font-semibold mb-1.5">
                  Username
                </label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full p-1.5 font-mono outline-none"
                />
              </div>

              <div>
                <label className="block font-serif font-semibold mb-1.5">
                  Email
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-1.5 font-mono outline-none"
                />
              </div>

              <div>
                <label className="block font-serif font-semibold mb-1.5">
                  DOB
                </label>
                <input
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full p-1.5 font-mono outline-none"
                />
              </div>

              <div>
                <label className="block font-serif font-semibold mb-1.5">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="w-full p-1.5 font-mono outline-none"
                />
              </div>

              <div>
                <label className="block font-serif font-semibold mb-1.5">
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full p-1.5 font-mono outline-none"
                />
              </div>

              <div>
                <label className="block font-serif font-semibold mb-1.5">
                  Age
                </label>
                <input
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  className="w-full p-1.5 font-mono outline-none"
                />
              </div>

              <div>
                <label className="block font-serif font-semibold mb-1.5">
                  Pan Number
                </label>
                <input
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  placeholder="Pan no"
                  className="w-full p-1.5 font-mono outline-none"
                />
              </div>

              <div>
                <label className="block font-serif font-semibold mb-1.5">
                  Aadhar
                </label>
                <input
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleChange}
                  placeholder="Aadhar"
                  className="w-full p-1.5 font-mono outline-none"
                />
              </div>

              <div className="mt-6 mb-6">
                <label className="flex gap-2 items-center justify-center">
                  <Upload size={20} /> Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>

                {preview && (
                  <div>
                    <img
                      src={preview}
                      alt="preview"
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={handleUpdate}
                className="bg-white p-2 rounded-xl font-semibold hover:bg-gray-500 active:scale-90 transition-transform"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
