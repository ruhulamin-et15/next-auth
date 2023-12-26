import { connectDB, isAdmin, isLoggedIn } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User";
import { NextResponse } from "next/server";

//get all users
export const GET = async (req) => {
  try {
    //check login user
    const loggedInResponse = await isLoggedIn(req);
    if (loggedInResponse) {
      return loggedInResponse;
    }

    //check admin
    const adminResponse = await isAdmin(req);
    if (adminResponse) {
      return adminResponse;
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
