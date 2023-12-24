"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const GetProducts = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);
  return (
    <>
      <p className="text-center text-3xl font-semibold underline mb-4">
        All Products
      </p>
      <div className="flex flex-col">
        <div className="px-4 my-4 grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {products?.map((product) => (
            <div
              key={product._id}
              className="border p-4  bg-green-300 rounded-lg"
            >
              <p>Product Name: {product.name}</p>
              <p>Product Category: {product.category.name}</p>
              <p>Seller: {product.creater.name}</p>
              <p>Description: {product.desc}</p>
              <p>Price: {product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Shipping Charge: {product.shipping}</p>
              <p>Sold: {product.sold}</p>
              <div>
                <Link
                  href={`/auth/admin/products/${product._id}`}
                  className="border px-2 rounded-md bg-gray-400"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GetProducts;
