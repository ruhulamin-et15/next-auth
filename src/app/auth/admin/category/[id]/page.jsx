"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SinglePage = ({ params }) => {
  const [category, setCategory] = useState(null);
  useEffect(() => {
    fetch(`/api/category/${params.id}`)
      .then((res) => res.json())
      .then((data) => setCategory(data.category));
  }, []);

  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/category/${params.id}`);
      const data = await response.data;
      toast.success(data.msg);
      router.push("/auth/admin/category");
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <>
      <div className="min-h-[85vh] flex flex-col justify-center items-center">
        <h4 className="mb-5 text-2xl text-gray-400 underline italic font-bold">
          Category Info
        </h4>
        <div className=" flex flex-col gap-3 sm:w-4/5 lg:w-3/5 bg-gray-400 p-5 rounded-md text-white">
          <p>Name: {category?.name}</p>
          <div className="flex gap-4">
            <p className="bg-blue-400 p-2 rounded-md">
              <Link href={`/auth/admin/category/update/${params.id}`}>
                Update
              </Link>
            </p>
            <p className="bg-red-400 p-2 rounded-md">
              <button onClick={handleDelete}>Delete</button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePage;
