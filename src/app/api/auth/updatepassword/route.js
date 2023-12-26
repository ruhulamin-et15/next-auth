import { connectDB, isLoggedIn } from "@/lib/config/db";
import { VerifyToken } from "@/lib/service/Token.service";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserModel } from "@/lib/models/User";

export const PUT = async (req) => {
  try {
    //check login user
    const loggedInResponse = await isLoggedIn(req);
    if (loggedInResponse) {
      return loggedInResponse;
    }

    const token = req.cookies.get("token" || "");
    const { userId } = await VerifyToken(token.value);

    const { password, cpassword } = await req.json();
    if (cpassword !== password) {
      return NextResponse.json(
        {
          error: "New Password & Confirm Password are not match",
        },
        { status: 401 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await connectDB();
    await UserModel.findByIdAndUpdate(userId, {
      $set: {
        password: hashPassword,
      },
    });

    return NextResponse.json(
      { msg: "User Password Updated Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "User Password Update failed" },
      { status: 500 }
    );
  }
};
