import mongoose from "mongoose";
import { VerifyToken } from "../service/Token.service";
import { NextResponse } from "next/server";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB is connected");
  } catch (error) {
    mongoose.disconnect();
    process.exit();
  }
};

//login user check
export const isLoggedIn = async (request) => {
  try {
    const token = request.cookies.get("token") || "";
    if (!token) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: 401 }
      );
    }

    const { userId } = await VerifyToken(token.value);
    if (!userId) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }
  } catch (error) {
    console.log(error);
  }
};

//admin check
export const isAdmin = async (request) => {
  try {
    const token = request.cookies.get("token") || "";
    if (!token) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: 401 }
      );
    }
    const { admin } = await VerifyToken(token.value);

    if (!admin) {
      return NextResponse.json(
        { error: "Only admin see users list" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

//banned check
export const isBanned = async (request) => {
  try {
    const token = request.cookies.get("token") || "";
    const { banned } = await VerifyToken(token.value);

    if (!banned) {
      return NextResponse.json(
        { error: "You Banned, Contact Authority" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
  }
};
