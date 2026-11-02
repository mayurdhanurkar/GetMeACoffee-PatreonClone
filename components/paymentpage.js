"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import { fetchuser, initiate, fetchpayments } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import { Bounce } from "react-toastify";
import { useRouter } from "next/navigation";

// import { useSession } from 'next-auth/react'

const PaymentPage = ({ username }) => {
  // const { data: session } = useSession();
  const [loaded, setLoaded] = useState(false);
  const [from_username, setFrom_username] = useState({ name: "", amount: "", message: "" });
  const [currentuser, setCurrentuser] = useState({});
  const [payments, setpayments] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    if (searchParams.get("status") == "completed") {
      toast("🦄 Payment has been made!", {
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
    router.push(`/${username}`);
  }, []);

  const handlechange = (e) => {
    setFrom_username({ ...from_username, [e.target.name]: e.target.value });
  };

  const getdata = async () => {
    let u = await fetchuser(username);
    setCurrentuser(u);
    let dbpayments = await fetchpayments(username);
    setpayments(dbpayments);
  };

  const payNow = async (amount) => {
    if (!from_username.name?.trim()) {
      toast("🦄 Please Enter Name before donating!", {
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
      return;
    } else if (!amount || amount <= 0) {
      toast("🦄 please enter a valid amount!", {
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
      return;
    }

    let a = await initiate(amount, username, from_username);
    let orderid = a.id;
    var options = {
      key: currentuser.razorpayId, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits.
      currency: "INR",
      name: "Dhebi-dhubi", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderid, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "dhebarmati", //your customer's name
        email: "dhebarmati@example.com",
        contact: "9999999999", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <>
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
      <Script src="https://checkout.razorpay.com/v1/checkout.js" onLoad={() => setLoaded(true)} />

      <div className="">
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative aspect-[3/1] w-full bg-slate-800">
            {currentuser.coverpic && (
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src={currentuser.coverpic}
                alt=""
              />
            )}
          </div>
          <div className="absolute -bottom-10  ">
            <div className="max-w-md rounded-3xl p-[2px] bg-gradient-to-b from-blue-300 to-pink-300 dark:from-blue-800 dark:to-purple-800 ">
              <div className="rounded-[calc(1.5rem-1px)]  bg-white dark:bg-gray-900">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-[calc(1.5rem-1px)] bg-slate-800">
                  {currentuser.profilepic && (
                    <img
                      className="h-24 w-24 object-cover"
                      src={currentuser.profilepic}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-12">
          <p className="flex justify-center font-bold  ">@{username}</p>
          <p className="flex justify-center text-gray-700 dark:text-gray-300">
            Lets help {username} to get a coffee!
          </p>
          <p className="flex justify-center text-gray-500 dark:text-gray-400">
            {payments.length} Payments . ₹
            {payments.reduce((acc, curr) => acc + curr.amount, 0) / 100} raised
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 container my-4">
          <div className="md:w-1/2 w-full p-4 bg-slate-900 rounded-lg order-2 md:order-1">
            {/* //show the list of supporters! */}
            <h2 className="text-lg mb-3 font-bold">Supporters</h2>
            <ul className="h-72 overflow-y-auto">
              {payments.length === 0 && (
                <p className="">No Supporters Yet Be the first to get Personal DM from me.</p>
              )}
              {payments.map((p, i) => {
                return (
                  <li key={i} className="my-2 flex min-w-0 items-start gap-2">
                    <img className="w-8 shrink-0 rounded-full md:w-9" src="/user.gif" alt="" />
                    <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                    {p.name} donated <span className="md:font-bold">₹{p.amount / 100}</span>
                    {p.message && <span className="break-words [overflow-wrap:anywhere]"> with a message &quot;{p.message}&quot;</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="md:w-1/2 w-full p-4 bg-slate-900 rounded-lg order-1 md:order-2">
            <h2 className="text-lg mb-3 font-bold">Make a Payment</h2>
            <form className="flex flex-col gap-4">
              {/* enter name */}
              <input
                onChange={handlechange}
                value={from_username.name}
                name="name"
                type="text"
                placeholder="Enter Name"
                aria-label="Your name"
                className="p-2 rounded-lg bg-slate-800 text-white"
              />
              <input
                onChange={handlechange}
                value={from_username.amount}
                name="amount"
                type="number"
                placeholder="Enter Amount"
                aria-label="Donation amount"
                className="p-2  rounded-lg bg-slate-800 text-white"
              />
              <textarea
                onChange={handlechange}
                value={from_username.message}
                name="message"
                placeholder="Enter Message (Optional)"
                aria-label="Optional donation message"
                className="p-2 rounded-lg bg-slate-800 text-white"
              ></textarea>
              <button
                onClick={() => payNow(from_username.amount * 100)}
                disabled={!loaded}
                type="button"
                className="bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
              >
                {loaded ? "Donate" : "Loading..."}
              </button>
              {/* or choose a amount */}
              <div className="flex gap-4 flex-wrap">
                <button
                  type="button"
                  onClick={() => payNow(10000)}
                  className="bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
                >
                  ₹100
                </button>
                <button
                  type="button"
                  onClick={() => payNow(20000)}
                  className="bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
                >
                  ₹200
                </button>
                <button
                  type="button"
                  onClick={() => payNow(50000)}
                  className="bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
                >
                  ₹500
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
