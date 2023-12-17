import { NextResponse } from "next/server";

export const middleware = (request) => {
  const pathVariable = request.nextUrl.pathname;

  //all user acces this route
  const publicRoute = [
    "/",
    "/forget-password",
    "/update-password",
    "/register",
    "/login",
  ];
  const isLoggedIn = request.cookies.get("token");
  if (publicRoute.includes(pathVariable) && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!publicRoute.includes(pathVariable) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
};

export const config = {
  //protected route
  matcher: ["/profile", "/update-profile", "/updatepassword", "/users/:path*"],
};
