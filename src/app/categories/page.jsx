"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories));
  }, []);
  return (
    <>
      <h3 className="text-center mb-3 text-2xl underline italic font-semibold">
        Categories
      </h3>
      <div className="p-4 grid gap-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 text-center">
        {categories?.map((category) => {
          return (
            <div
              className="text-xl bg-green-500 py-1 lg:py-6 md:py-4 sm:py-3 rounded-md"
              key={category._id}
            >
              <Link href={`/categories/${category._id}`}>
                <p>{category.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
