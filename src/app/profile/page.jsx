"use client";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
// import { useEffect, useState } from "react";

const Profile = () => {
  const { user } = useAuth();
  if (!user) {
    return <Loading />;
  }
  return (
    <>
      <div className="min-h-[82vh] w-full flex flex-col items-center justify-center">
        <h4 className="mb-4 text-2xl text-orange-400 underline italic">
          User Information
        </h4>
        <div className=" lg:w-2/4 md:w-4/5 sm:w-5/6 bg-blue-400 p-4 rounded-md">
          <p className="text-xl mb-2 text-white">Name: {user.name}</p>
          <p className="text-xl mb-2 text-white">Email: {user.email}</p>
          <div className="flex gap-3">
            <p className="bg-orange-400 w-2/6 px-1 text-center py-1 rounded-md hover:bg-green-400">
              <Link href={"/update-profile"}>Update Info</Link>
            </p>
            <p className="bg-orange-400 w-2/6 px-1 text-center py-1 rounded-md hover:bg-green-400">
              <Link href={"/updatepassword"}>Update Password</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
