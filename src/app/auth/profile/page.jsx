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
      <div className="lg:min-h-screen flex flex-col justify-center items-center">
        <h4 className="text-center py-4 text-2xl text-orange-400 underline italic">
          User Information
        </h4>
        <div className="bg-green-300 lg:rounded-lg lg:w-3/5 md:w-4/5 sm:w-full mx-auto">
          <div className="mt-3 py-4 px-20 grid grid-cols-2">
            <div className="w-1/3">
              <p className="text-xl mb-2 text-gray-600">Name:</p>
              <p className="text-xl mb-2 text-gray-600">Email:</p>
              <p className="text-xl mb-2 text-gray-600">Phone:</p>
              <p className="text-xl mb-2 text-gray-600">Country:</p>
            </div>
            <div className=" w-2/3">
              <p className="text-xl mb-2 text-gray-600">{user.name}</p>
              <p className="text-xl mb-2 text-gray-600">{user.email}</p>
              <p className="text-xl mb-2 text-gray-600">{user.phone}</p>
              <p className="text-xl mb-2 text-gray-600">{user.country}</p>
            </div>
          </div>
          <div className="flex gap-2 px-20 pb-4">
            <p className="bg-orange-400 w-1/2 px-1 text-center py-1 rounded-md hover:bg-green-600">
              <Link href={"/auth/update-profile"}>Update Info</Link>
            </p>
            <p className="bg-orange-400 w-1/2 px-1 text-center py-1 rounded-md hover:bg-green-600">
              <Link href={"/auth/updatepassword"}>Update Password</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
