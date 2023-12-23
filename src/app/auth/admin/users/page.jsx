"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    fetch("/api/auth/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);

  return (
    <>
      <h3 className="text-center text-2xl underline italic font-semibold text-gray-600 mb-5">
        All Users
      </h3>
      <div>
        <table className="min-w-full border-collapse block md:table">
          <thead className="block md:table-header-group">
            <tr className="border border-grey-500  md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Name
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Email Address
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Phone
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Country
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Create Date
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Update Date
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {users?.map((user) => (
              <tr
                key={user._id}
                className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
              >
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Name
                  </span>
                  {user.name}
                </td>

                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Email Address
                  </span>
                  {user.email}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Mobile
                  </span>
                  {user.phone}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Country
                  </span>
                  {user.country}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Create Date
                  </span>
                  {user.createdAt}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Update Date
                  </span>
                  {user.updatedAt}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">
                    Actions
                  </span>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
                    <Link href={`/auth/admin/users/${user._id}`}>
                      See Details
                    </Link>
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const response = await axios.delete(
                          `/api/auth/users/${user._id}`
                        );
                        const data = await response.data;
                        toast.success(data.msg);
                        window.location.reload();
                      } catch (error) {
                        toast.error(error?.response?.data?.error);
                      }
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded ms-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
