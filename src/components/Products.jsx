"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const GetProducts = () => {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);
  return (
    <>
      <div>
        <h3 className="text-center mb-3 text-2xl underline italic font-semibold">
          Category Name
        </h3>
        <div className="flex">
          <div className="grid gap-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {products?.map((product) => {
              return (
                <div>
                  <ul
                    className="text-xl bg-green-500 px-4 py-1 rounded-md"
                    key={product._id}
                  >
                    <li>{product.name}</li>
                    <p className="bg-gray-400 rounded-md text-center">
                      <Link href={`/auth/products/${product._id}`}>
                        Details
                      </Link>
                    </p>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default GetProducts;
