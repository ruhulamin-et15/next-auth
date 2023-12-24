"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

//get all products filter by category
const SingleCategory = ({ params }) => {
  const [products, setProducts] = useState();
  useEffect(() => {
    fetch(`/api/category/category-products/${params.id}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  //get category data
  const [category, setCategory] = useState();
  useEffect(() => {
    fetch(`/api/category/${params.id}`)
      .then((res) => res.json())
      .then((data) => setCategory(data.category));
  }, []);

  return (
    <>
      <div>
        <p className="text-center text-3xl font-semibold underline mb-4">
          Product Category: {category?.name}
        </p>
        <div className="flex flex-col">
          <div className="px-4 mt-5 grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {products?.map((product) => (
              <div
                key={product._id}
                className="border p-4  bg-green-300 rounded-lg"
              >
                <p>Product Name: {product.name}</p>
                <p>Description: {product.desc}</p>
                <p>Price: {product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Shipping Charge: {product.shipping}</p>
                <p>Sold: {product.sold}</p>
                <Link
                  href={`/categories/${category?._id}/get-product/${product._id}`}
                >
                  <p>Details</p>
                </Link>
                <Link href={`/`}>Add To Cart</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCategory;
