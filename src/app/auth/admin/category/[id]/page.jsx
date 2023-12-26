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
      <div className="lg:min-h-screen flex flex-col justify-center items-center px-4">
        <h2 className="py-4 text-center text-2xl font-semibold underline">
          Manage Category
        </h2>
        <div className="bg-green-300 lg:rounded-lg lg:w-3/5 md:w-4/5 sm:w-full w-full">
          <div className="mt-3 py-4 px-20 grid gap-2 grid-cols-2">
            <div className="w-full">
              <p className="text-xl mb-2 text-gray-600">Category Name:</p>
              <p className="text-xl mb-2 text-gray-600">Creator Name:</p>
              <p className="text-xl mb-2 text-gray-600">Creator ID:</p>
              <p className="text-xl mb-2 text-gray-600">Created Date:</p>
              <p className="text-xl mb-2 text-gray-600">Updated Date:</p>
            </div>
            <div className="w-full">
              <p className="text-xl mb-2 text-gray-600">{category?.name}</p>
              <p className="text-xl mb-2 text-gray-600">
                {category?.creater.name}
              </p>
              <p className="text-xl mb-2 text-gray-600">
                {category?.creater._id}
              </p>
              <p className="text-xl mb-2 text-gray-600">
                {category?.createdAt}
              </p>
              <p className="text-xl mb-2 text-gray-600">
                {category?.updatedAt}
              </p>
            </div>
            <p className=" text-center bg-blue-400 p-2 rounded-md">
              <Link href={`/auth/admin/category/update-category/${params.id}`}>
                Update
              </Link>
            </p>
            <p className=" text-center bg-red-400 p-2 rounded-md">
              <button onClick={handleDelete}>Delete</button>
            </p>
          </div>
        </div>
        <p></p>
      </div>
    </>
  );
};

export default SinglePage;
