"use client";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {updateProfile, fetchuser} from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const Dashboard = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    //This waits while NextAuth is checking the session.
    if (session === undefined) {
  return;
    }
    //This redirects only when the session check is complete and no user is logged in.
    if (!session) {
      router.push("/login");
      return;
    }
    getdata(session.user.name);
  }, [session, router]);

  const getdata = async (username) => {
    let data = await fetchuser(username);
    setUserData(data);
  }

  const handleSubmit = async (formData) => {
    const result = await updateProfile(session.user.name, formData);
    if (result?.error) {
      toast.error(result.error, {
        theme: "dark",
      });
      return;
    }
    toast("🦄 Profile Updated Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }

  return (
    <div className=" ">
      <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
    <div className="h-full w-full  text-white flex items-center justify-center p-4 md:mt-14">
      <div className="w-full max-w-xl bg-[#0f172a]/80 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Welcome to your Dashboard
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Update your account details and payment integration keys
          </p>
        </div>

        {/* Form Layout */}
        <form className="space-y-3.5" action={handleSubmit}>
          
          {/* Name & Username Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-slate-300 mb-1.5">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Mayur Dhanurkar"
                required
                name="name"
                value={userData.name || ""}
                onChange={(e)=>setUserData({...userData, name:e.target.value})}
                className="w-full px-3.5 py-2 bg-[#1e293b] border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-xs font-medium text-slate-300 mb-1.5">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="mayurdhanurkar"
                required
                name="username"
                value={userData.username || ""}
                onChange={(e)=>setUserData({...userData, username:e.target.value})}
                className="w-full px-3.5 py-2 bg-[#1e293b] border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="mayur@example.com"
              required
              name="email"
              value={userData.email || ""}
              onChange={(e)=>setUserData({...userData, email:e.target.value})}
              className="w-full px-3.5 py-2 bg-[#1e293b] border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            />
          </div>

          {/* Profile & Cover Pictures in 2-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="profilePic" className="block text-xs font-medium text-slate-300 mb-1.5">
                Profile Picture
              </label>
              <input
                type="text"
                id="profilePic"
                name="profilepic" 
                defaultValue={userData.profilepic || ""}
                placeholder="https://example.com/profile.jpg"
                className="w-full px-3.5 py-2 bg-[#1e293b] border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            <div>
              <label htmlFor="coverPic" className="block text-xs font-medium text-slate-300 mb-1.5">
                Cover Picture
              </label>
              <input
                type="text"
                id="coverPic"
                name="coverpic"
                defaultValue={userData.coverpic || ""}
                placeholder="https://example.com/cover.jpg"
                className="w-full px-3.5 py-2 bg-[#1e293b] border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>
          </div>

          {/* Razorpay Credentials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="razorpayId" className="block text-xs font-medium text-slate-300 mb-1.5">
                Razorpay Id
              </label>
              <input
                type="text"
                id="razorpayId"
                placeholder="rzp_test_xxxxxx"
                required
                name="razorpayId" 
                defaultValue={userData.razorpayId || ""}
                className="w-full px-3.5 py-2 bg-[#1e293b] border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            <div>
              <label htmlFor="razorpaySecret" className="block text-xs font-medium text-slate-300 mb-1.5">
                Razorpay Secret
              </label>
              <input
                type="password"
                id="razorpaySecret"
                placeholder="••••••••••••••••"
                required
                name="razorpaySecret"
                defaultValue={userData.razorpaySecret || ""}
                className="w-full px-3.5 py-2 bg-[#1e293b] border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-lg shadow-md transition duration-200 ease-in-out"
          >
            Save
          </button>
        </form>
      </div>
    </div>

    </div>
  );
};

export default Dashboard;
