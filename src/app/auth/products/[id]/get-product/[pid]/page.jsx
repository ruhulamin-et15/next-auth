"use client";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SingleProductPage = ({ params }) => {
  const { user } = useAuth();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/products/${params.pid}`);
      const data = await response.data;
      setProduct(data);
    };

    fetchData();
  }, []);

  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `/api/products/user-products/${params.pid}`
      );
      const data = res.data;
      toast.success(data.msg);
      router.push(`/auth/products/${user._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <>
      <div className="lg:min-h-screen flex flex-col justify-center items-center px-4">
        <h2 className="py-4 text-center text-2xl font-semibold underline">
          Your Product
        </h2>
        <div className="bg-green-300 lg:rounded-lg lg:w-3/5 md:w-4/5 sm:w-full w-full">
          <div className="mt-3 py-4 px-20 grid gap-2 grid-cols-2">
            <div className="w-full">
              <p className="text-xl mb-2 text-gray-600">Product Name:</p>
              <p className="text-xl mb-2 text-gray-600">Description:</p>
              <p className="text-xl mb-2 text-gray-600">Category:</p>
              <p className="text-xl mb-2 text-gray-600">Quantity:</p>
              <p className="text-xl mb-2 text-gray-600">Sold:</p>
              <p className="text-xl mb-2 text-gray-600">Price:</p>
              <p className="text-xl mb-2 text-gray-600">Seller:</p>
              <p className="text-xl mb-2 text-gray-600">Shipping Charge:</p>
            </div>
            <div className="w-full">
              <p className="text-xl mb-2 text-gray-600">
                {product?.singleProduct.name}
              </p>
              <p className="text-xl mb-2 text-gray-600">
                {product?.singleProduct.desc}
              </p>
              <p className="text-xl mb-2 text-gray-600">
                {product?.singleProduct.category?.name}
              </p>
              <p className="text-xl mb-2 text-gray-600">
                {product?.singleProduct.quantity}
              </p>
              <p className="text-xl mb-2 text-gray-600">
                {product?.singleProduct.sold}
              </p>
              <p className="text-xl mb-2 text-gray-600">
                ${product?.singleProduct.price}
              </p>
              <p className="text-xl mb-2 text-gray-600">
                {product?.singleProduct.creater?.name}
              </p>
              <p className="text-xl mb-2 text-gray-600">
                ${product?.singleProduct.shipping}
              </p>
            </div>
            <Link
              href={`/auth/products/${user?._id}/update-product/${params.pid}`}
            >
              <p className=" text-center bg-blue-400 p-2 rounded-md">Update</p>
            </Link>

            <button onClick={handleDelete}>
              <p className=" text-center bg-red-400 p-2 rounded-md">Delete</p>
            </button>
          </div>
        </div>
        <p></p>
      </div>
    </>
  );
};

export default SingleProductPage;
