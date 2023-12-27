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
      <h4 className="text-center py-4 text-2xl text-orange-400 underline italic">
        User Information
      </h4>
      <div className="flex justify-center">
        <div className="bg-green-300 rounded-lg lg:w-1/2 md:w-1/2 sm:w-full p-2">
          <div className="ms-16">
            <p className="text-xl mb-2 text-gray-600">Name: {user.name}</p>
            <p className="text-xl mb-2 text-gray-600">Email: {user.email}</p>
            <p className="text-xl mb-2 text-gray-600">Phone: {user.phone}</p>
            <p className="text-xl mb-2 text-gray-600">
              Country: {user.country}
            </p>
          </div>
          <div className="flex flex-col mx-16">
            <div className="grid grid-cols-2 gap-2">
              <p className="bg-orange-400 px-1 text-center py-1 rounded-md hover:bg-green-600 ">
                <Link href={"/auth/profile/update-profile"}>Update Info</Link>
              </p>
              <p className="bg-orange-400 px-1 text-center py-1 rounded-md hover:bg-green-600 ">
                <Link href={"/auth/updatepassword"}>Update Password</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
