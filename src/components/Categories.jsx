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
      <div>
        <h3 className="text-center mb-3 text-2xl underline italic font-semibold">
          Category Name
        </h3>
        <div className="flex">
          <div className="grid gap-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {categories?.map((category) => {
              return (
                <div>
                  <ul
                    className="text-xl bg-green-500 px-4 py-1 rounded-md"
                    key={category._id}
                  >
                    <li>{category.name}</li>
                    <p className="bg-gray-400 rounded-md text-center">
                      <Link href={`/auth/admin/category/${category._id}`}>
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

export default Categories;
