"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const Profile = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="min-h-[82vh] flex flex-col justify-center items-center">
        <h2 className="mb-10 text-2xl font-semibold underline">User Profile</h2>
        <div className="border border-black w-4/6 min-h-[10vh] p-4">
          <div className="mb-2">
            <p className="font-semibold text-2xl">Name: {user?.name}</p>
          </div>
          <div className="mb-2">
            <p className="font-semibold text-2xl">Email: {user?.email}</p>
          </div>
          <div className="mb-2">
            <Link
              className="border border-green-400 px-4 py-1 rounded-lg bg-blue-500"
              href={"/auth/update-profile"}
            >
              Update Profile
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
