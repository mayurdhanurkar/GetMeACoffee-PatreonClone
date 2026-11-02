"use server";

import Razorpay from "razorpay";
import connectDB from "@/DB/connectdb";
import Payment from "@/models/payments";
import User from "@/models/user";


export const initiate = async (amount, to_username, from_username, username) => {
  await connectDB();
  //fetch the secret of the user who is receiving the payment
  let user = await User.findOne({ username: to_username });
  let secret = user.razorpaySecret;
  var instance = new Razorpay({ key_id: user.razorpayId, key_secret: secret });

  // instance.orders.create({
  //   amount: 50000,
  //   currency: "INR",
  //   receipt: "receipt#1",
  //   notes: {
  //     key1: "value3",
  //     key2: "value2",
  //   },
  // });
  let options = {
    amount: Number.parseInt(amount), // amount in the smallest currency unit
    currency: "INR",
  }
  let x = await instance.orders.create(options);
  //create a payment object which shows a pending payment in the database
  await Payment.create({orderId: x.id, amount: amount, to_user: to_username, name: from_username.name, message: from_username.message})
  return x;
};

export const fetchuser = async (username) => {
  await connectDB();
  let u = await User.findOne({username: username})
  let user = u.toObject({flattenObjectIds: true})
  return user;
}

export const fetchpayments = async (username) => {
  await connectDB();
  //create a decresing order by payment amounts65
  let p = await Payment.find({to_user: username, status: "completed"}).sort({amount: -1}).lean()
  
  return JSON.parse(JSON.stringify(p));
}

export const updateProfile = async (oldusername, data) => {
  await connectDB();
  let ndata = Object.fromEntries(data);
  //if the username is being updated, check if the new username is already available 
  if(ndata.username && ndata.username != oldusername){

  let u = await User.findOne({username: ndata.username})
  if (u) return { error: "Username already exists" };
  }
  //now update all the usernames in the paymments table
  await Payment.updateMany({to_user: oldusername}, {$set: {to_user: ndata.username}})
  //now update the user profile
     const result = await User.updateOne(
    { username: oldusername },
    { $set: ndata },
    { runValidators: true }
  );

  if (result.matchedCount === 0) return { error: "User not found" };
  return { success: true };
}