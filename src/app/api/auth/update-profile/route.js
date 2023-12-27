import { connectDB, isLoggedIn } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User";
import { VerifyToken } from "@/lib/service/Token.service";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
  //check login user
  const loggedInResponse = await isLoggedIn(req);
  if (loggedInResponse) {
    return loggedInResponse;
  }

  const token = req.cookies.get("token" || "");
  const { userId } = await VerifyToken(token.value);

  await connectDB();
  const { name, email, phone, country } = await req.json();

  //user update using id from cookies
  const existUser = await UserModel.findByIdAndUpdate(userId, {
    $set: {
      name,
      email,
      phone,
      country,
    },
  });

  //user check by id
  if (!existUser) {
    return NextResponse.json({ error: "User does not found" }, { status: 401 });
  }

  return NextResponse.json(
    { msg: "Profile Updated Successfully" },
    { status: 201 }
  );
};
