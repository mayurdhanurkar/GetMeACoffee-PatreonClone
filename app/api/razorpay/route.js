import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import connectDB from "@/DB/connectdb";
import Payment from "@/models/payments";
import User from "@/models/user";

export const POST = async (request) => {
  await connectDB();
  let body = await request.formData();
  body = Object.fromEntries(body);

  //check if razorpayid is present in the body
  let p = await Payment.findOne({ orderId: body.razorpay_order_id });
  if (!p) {
    return NextResponse.json({ sucess: false, message: "Order id not found." });
    // return NextResponse.error("Order id not found.")
  }

  //fetch the secret of the user who is receiving the payment
  let user = await User.findOne({ username: p.to_user });
  let secret = user.razorpaySecret;

  //verfiy the payment
  let xx = validatePaymentVerification(
    {
      order_id: body.razorpay_order_id,
      payment_id: body.razorpay_payment_id,
    },
    body.razorpay_signature,
    secret,
  );

  if (xx) {
    //update the payment status
    const updatedPayment = await Payment.findOneAndUpdate(
      { orderId: body.razorpay_order_id },
      { status: "completed" },
      { new: true },
    );
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL}/${encodeURIComponent(updatedPayment.to_user)}?status=${encodeURIComponent(updatedPayment.status)}`,
    );
  } else {
    // return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/payment-failed?amount=${p.amount}&name=${p.name}&message=${p.message}`)
    // return NextResponse.error("payment verification failed.")
    return NextResponse.json({ message: "payment verification failed." });
  }
};
