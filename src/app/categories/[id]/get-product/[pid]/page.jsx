"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const SingleProductPage = ({ params }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/products/${params.pid}`);
      const data = await response.data;
      setProduct(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="lg:min-h-screen flex flex-col justify-center items-center px-4">
        <h2 className="py-4 text-center text-2xl font-semibold underline">
          Product Details
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
                ${product?.singleProduct.quantity}
              </p>
              <p className="text-xl mb-2 text-gray-600">
                ${product?.singleProduct.sold}
              </p>
              <p className="text-xl mb-2 text-gray-600">
                ${product?.singleProduct.price}
              </p>
              <p className="text-xl mb-2 text-gray-600">
                {product?.singleProduct.creater?.name}
              </p>
              <p className="text-xl mb-2 text-gray-600">
                {product?.singleProduct.shipping}
              </p>
            </div>
            <div className="w-full bg-blue-400 rounded-md py-1 text-center">
              <Link href="/">Buy Now</Link>
            </div>
            <div className="w-full bg-blue-400 rounded-md py-1 text-center">
              <Link href="/">Add to Cart</Link>
            </div>
          </div>
        </div>
        <p></p>
      </div>
    </>
  );
};

export default SingleProductPage;
