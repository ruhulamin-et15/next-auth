"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const GetProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 m-2">
          {products?.map((product) => (
            <div
              key={product._id}
              className="bg-white  rounded-lg p-2 min-h-[60vh]"
            >
              <div className="h-3/4">
                <img className="w-full h-full rounded-md" src={"/watch.png"} />
              </div>
              <div className="bg-blue-300 h-1/4 rounded-md">
                <p className="ms-3 pt-1 text-xl">
                  Product Name: {product.name}
                </p>
                <p className="ms-3 text-xl text-white">
                  Price:{" "}
                  {product.price.toLocaleString("en-BD", {
                    style: "currency",
                    currency: "BDT",
                  })}
                </p>

                <div className="flex flex-col ">
                  <div className="grid grid-cols-2">
                    <Link href={`/products/${product._id}`}>
                      <p className="bg-gray-400 rounded-md mx-2 py-1 text-center hover:bg-green-400">
                        Details
                      </p>
                    </Link>
                    <button className="bg-gray-400 rounded-md mx-2 py-1 text-center hover:bg-green-400">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GetProducts;
