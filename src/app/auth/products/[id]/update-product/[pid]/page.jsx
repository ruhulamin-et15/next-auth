"use client";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdateUserProduct = ({ params }) => {
  const [categories, setCategories] = useState();
  const [product, setProduct] = useState();
  const { user } = useAuth();

  //for mapping all data
  useEffect(() => {
    fetch(`/api/category`)
      .then((res) => res.json())
      .then((data) => setCategories(data.categories));
  }, []);

  //for get single data
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/products/${params.pid}`);
      const data = await response.data.singleProduct;
      setProduct(data);
      if (data) {
        setName(data.name || "");
        setDesc(data.desc || "");
        setPrice(data.price || "");
        setSold(data.sold || 0);
        setShipping(data.shipping || 0);
        setQuantity(data.quantity || "");
      }
    };
    fetchData();
  }, [params.id]);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [sold, setSold] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState();

  const router = useRouter();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(
        `/api/products/user-products/${params.pid}`,
        {
          name,
          desc,
          price,
          sold,
          shipping,
          quantity,
          category,
        }
      );
      const data = await response.data;
      toast.success(data.msg);
      router.push(`/auth/products/${user._id}/get-product/${params.pid}`);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };
  return (
    <>
      <h2 className="text-center text-2xl text-gray-500 underline italic py-3 font-semibold">
        Update Product
      </h2>
      <div className="bg-green-300 rounded-md lg:w-9/12 md:w-4/5 sm:w-full mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-4 grid lg:gap-10 lg:grid-cols-2">
            <div className="mb-1">
              <label htmlFor="name">Product Name:</label>
              <input
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="text"
                name="name"
                id="name"
                value={name}
                placeholder="Enter Product Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="price">Price:</label>
              <input
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="number"
                name="price"
                id="price"
                value={price}
                placeholder="Enter Product Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="quantity">Quantity:</label>
              <input
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="number"
                name="quantity"
                id="quantity"
                value={quantity}
                placeholder="Enter Product Quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="sold">Sold:</label>
              <input
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="number"
                name="sold"
                id="sold"
                value={sold}
                placeholder="Enter Product Sold"
                onChange={(e) => setSold(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="shipping">Shipping Charge:</label>
              <input
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="number"
                name="shipping"
                id="shipping"
                value={shipping}
                placeholder="Enter Shipping Charge"
                onChange={(e) => setShipping(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="category">Category:</label>
              <select
                name="category"
                id="category"
                value={category}
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="0">Select Category</option>
                {categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-1 w-full">
              <label htmlFor="desc">Description:</label>
              <input
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                component="textarea"
                rows="4"
                type="text"
                name="desc"
                id="desc"
                value={desc}
                placeholder="Product Description"
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-center text-white bg-green-500 rounded-lg px-4 py-2"
          >
            Update Product
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateUserProduct;
