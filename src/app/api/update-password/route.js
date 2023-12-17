import { connectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User";
import { VerifyForgetToken } from "@/lib/service/Token.service";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const PUT = async (request) => {
  connectDB();

  const { email, password, cpassword, token } = await request.json();

  if (cpassword !== password) {
    return NextResponse.json(
      { error: "Password & Confirm Password are not match" },
      { status: 400 }
    );
  }

  const auth = token || "";

  if (!auth) {
    return NextResponse.json({ error: "Please login first" }, { status: 400 });
  }

  const { userId } = await VerifyForgetToken(auth, email);
  if (!userId) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
  }

  const existUser = await UserModel.findById(userId);

  if (!existUser) {
    return NextResponse.json({ error: "User does not found" }, { status: 404 });
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
