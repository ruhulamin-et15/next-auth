import { connectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User";
import { NextResponse } from "next/server";

//admin create/get/update/delete all users,
//create user

//get all users
export const GET = async (req) => {
  try {
    //login check
    const isLoggedIn = req.cookies.get("token") || "";
    if (!isLoggedIn) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: 401 }
      );
    }

    await connectDB();
    const users = await UserModel.find({});
    return NextResponse.json(
      { msg: "get all users successfully", users },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "unable to get users" }, { status: 500 });
  }
};
