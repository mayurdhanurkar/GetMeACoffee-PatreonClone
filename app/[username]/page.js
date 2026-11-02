import React from "react";
import PaymentPage from "@/components/paymentpage";
import {notFound} from "next/navigation"
import connectDB from "@/DB/connectdb";
import User from "@/models/user";

const Username = async ({ params }) => {
  const { username } = await params;
  //if the username is not present in the database, show 404 page
  await connectDB();
  //check if the username is present in the database
  const u = await User.findOne({ username });
  if (!u) {
    notFound();
  }
  return (
    <div className="">
      <PaymentPage username={username} />
      </div>
  );
};

export default Username;

export async function generateMetadata({ params }) {
    const { username } = await params;
    return {
        title: `${username} | Get Me A Coffee`,
        description: `Support ${username} by buying them a coffee!`,
    }
}