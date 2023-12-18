import { connectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User";
import { VerifyForgetToken } from "@/lib/service/Token.service";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const PUT = async (request) => {
  //login check
  const isLoggedIn = token || "";
  if (!isLoggedIn) {
    return NextResponse.json({ error: "Please login first" }, { status: 401 });
  }

  await connectDB();
  const { email, password, cpassword, token } = await request.json();
  if (cpassword !== password) {
    return NextResponse.json(
      { error: "New Password & Confirm Password are not match" },
      { status: 401 }
    );
  }

  //token verify
  const { userId } = await VerifyForgetToken(isLoggedIn, email);
  if (!userId) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }

  //user check
  const existUser = await UserModel.findById(userId);
  if (!existUser) {
    return NextResponse.json({ error: "User does not found" }, { status: 401 });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await UserModel.findByIdAndUpdate(userId, {
    $set: {
      password: hashPassword,
    },
  });

  return NextResponse.json(
    { msg: "Password Updated Successfully" },
    { status: 200 }
  );
};
