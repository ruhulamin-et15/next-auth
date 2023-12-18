"use client";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { CiLock } from "react-icons/ci";

const Navbar = () => {
  const { user } = useAuth();
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      const res = await axios.post("/api/auth/logout");
      const data = await res.data;
      toast.success(data.msg);
      window.location.reload();
      router.push("/auth/login");
    } catch (error) {
      toast.error(error.res?.data?.error);
    }
  };

  return (
    <>
      <Toaster />
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            href={"/"}
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <CiLock size={30} />
            <span className="ml-3 text-xl">Authentication</span>
          </Link>
          <nav className="md:ml-auto flex items-center text-base justify-center">
            {user ? (
              <>
                <Link
                  href={"/auth/admin/users"}
                  className="mr-5 hover:text-gray-900"
                >
                  Users Update
                </Link>
                <Link
                  href={"/auth/profile"}
                  className="mr-5 hover:bg-gray-500 hover:text-white"
                >
                  Hi, {user.name}
                </Link>
                <button
                  onClick={logoutHandler}
                  className="flex items-center bg-red-300 border-0 py-1 px-3 focus:outline-none hover:bg-red-400 rounded text-white md:mt-0"
                >
                  Logout
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <Link href={"/auth/login"} className="mr-5 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  href={"/auth/register"}
                  className="mr-5 hover:text-gray-900"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
