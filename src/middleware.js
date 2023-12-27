import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const middleware = async (request) => {
  const pathVariable = request.nextUrl.pathname;

  const publicRoute = [
    //public routes also login users
    "/",
    "/auth/forget-password",
    "/auth/update-password",
    "/auth/register",
    "/auth/login",
    "/products/:path*",
    "/categories/:path*",
  ];

  //user logic
  const isLoggedIn = request.cookies.get("token");

  //the route is public
  if (publicRoute.includes(pathVariable) && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //the route is protected without loggedin user & admin
  if (!publicRoute.includes(pathVariable) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  //admin logic
  const token = request.cookies.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const tokenValue = token.value;
  const decodedToken = jwt.decode(tokenValue);
  const isAdmin = decodedToken?.admin;

  //
  if (!isAdmin && pathVariable.startsWith("/auth/admin/")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
};

export const config = {
  matcher: [
    // users login route also admin
    "/auth/profile",
    "/auth/update-profile",
    "/auth/updatepassword",
    "/auth/orders",

    // only admin route
    "/auth/admin/:path*",
  ],
};
