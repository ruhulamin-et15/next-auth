import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const GET = async (request) => {
  try {
    const token = request.cookies.get("token") || "";

    const tokenValue = token.value || "";

    const decodedToken = jwt.decode(tokenValue);

    const userId = decodedToken?._id;

    return NextResponse.json({ _id: userId });
  } catch (error) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
};

// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export const GET = async (request) => {
//   try {
//     const token = request.cookies.get("token") || "";

//     // Extract the JWT value from the token cookie
//     const jwtValue = token.value || "";

//     // Decode the JWT to get the payload
//     const decodedToken = jwt.decode(jwtValue);

//     // Access the user ID from the decoded token payload
//     const userId = decodedToken?.userId;

//     return NextResponse.json({ userId });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to decode token" },
//       { status: 500 }
//     );
//   }
// };
