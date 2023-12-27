"use client";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const UpdateProfile = () => {
  const { user } = useAuth();
  if (!user) {
    return <Loading />;
  }

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [country, setCountry] = useState(user?.country || "");

  const router = useRouter();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.put("/api/auth/update-profile", {
        name,
        email,
        phone,
        country,
      });
      const data = await res.data;
      toast.success(data.msg);
      router.push("/auth/profile");
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center lg:justify-center">
        <h2 className="py-4 text-center text-2xl font-semibold underline">
          Update Profile
        </h2>
        <div className="bg-green-300 lg:rounded-lg lg:w-3/5 md:w-4/5 w-full">
          <form onSubmit={handleSubmit} className="mt-5 p-10">
            <div className="mb-3">
              <label htmlFor="name">Name:</label>
              <input
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your Name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email:</label>
              <input
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone">Phone:</label>
              <input
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="tel"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your Phone"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country">Country:</label>
              <input
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="text"
                name="country"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter your Country"
                required
              />
            </div>

            <div className="mt-4 flex lg:justify-end">
              <button
                type="submit"
                className="w-full lg:w-1/5 text-center text-white bg-green-500 rounded-lg px-4 py-2"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
