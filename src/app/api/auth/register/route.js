import { connectDB, isLoggedIn } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  //check allready login
  const loggedInResponse = await isLoggedIn(req);
  try {
    if (!loggedInResponse) {
      return NextResponse.json(
        { error: "You alrady logged in" },
        { status: 401 }
      );
    }
  } catch (error) {
    return loggedInResponse;
  }

  await connectDB();
  const { name, email, password, phone, country } = await req.json();

  //user check
  const existUser = await UserModel.findOne({ email });
  if (existUser) {
    return NextResponse.json({ error: "User already exist!" }, { status: 401 });
  }

  const newUser = await UserModel.create({
    name,
    email,
    password,
    phone,
    country,
  });
  return NextResponse.json(
    { msg: "User Registration Successfully", newUser },
    { status: 201 }
  );
};
