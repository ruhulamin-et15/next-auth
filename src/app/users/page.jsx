"use client";
import Loading from "@/components/Loading";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);

  // if (!users) {
  //   return <Loading />;
  // }
  return (
    <div className="min-h-[90vh] w-full bg-gray-400">
      <h4 className="text-center p-3 text-2xl text-white-400 underline italic">
        User Information
      </h4>

      <div className="grid gap-2 lg:grid-cols-3 md:grid-cols-2 m-5">
        {users?.map((item) => {
          return (
            <div className="bg-green-500 p-8 rounded-md" key={item._id}>
              <p>Name: {item.name}</p>
              <p>Email: {item.email}</p>

              <div className="flex gap-3">
                <p className="bg-gray-500 w-1/4 px-3 py-2 rounded-md mt-5 text-center">
                  <Link href={`/users/${item._id}`}>See Details</Link>
                </p>
                <p className="bg-red-500 w-1/4 px-3 py-2 rounded-md mt-5 text-center">
                  <button
                    onClick={async () => {
                      try {
                        const response = await axios.delete(
                          `/api/users/${item._id}`
                        );
                        const data = await response.data;
                        toast.success(data.msg);
                        window.location.reload();
                      } catch (error) {
                        toast.error(error?.response?.data?.error);
                      }
                    }}
                  >
                    Delete
                  </button>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
