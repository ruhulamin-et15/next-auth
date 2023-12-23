"use client";
import Loading from "@/app/loading";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";

const CreateProduct = () => {
  const { user } = useAuth();
  if (!user) {
    return <Loading />;
  }
  // const [name, setName] = useState("");
  // const [desc, setDesc] = useState("");
  // const [price, setPrice] = useState("");
  // const [quantity, setQuantity] = useState("");
  // const [sold, setSold] = useState("");
  // const [shipping, setShipping] = useState("");
  // const [image, setImage] = useState("");

  const validationSchema = yup.object({
    name: yup.string().required("Product Name is required"),
    desc: yup
      .string()
      .min(10, "Description must be grater than 10 characters")
      .required("Description is required"),
    price: yup.number().required("Price is required"),
    quantity: yup.number().required("quantity is required"),
    sold: yup.number(),
    shipping: yup.number(),
    image: yup.mixed(),
    category: yup.string().required("category is required"),
    // userId: yup.string().required("Please Refresh this page get to user ID"),
  });
  const initialaValue = {
    name: "",
    desc: "",
    price: "",
    sold: 0,
    shipping: 0,
    quantity: "",
    image: "",
    category: "",
  };

  const router = useRouter();

  const handleSubmit = async (e, { resetForm }) => {
    try {
      const response = await axios.post("/api/products", e);
      const data = await response.data;
      toast.success(data.msg);
      resetForm();
      router.push(`/auth/products/${user._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };
  return (
    <>
      <h2 className="text-center text-2xl text-gray-500 underline italic py-3 font-semibold">
        Add Your Product
      </h2>
      <div className="bg-green-300 rounded-md lg:w-9/12 md:w-4/5 sm:w-full mx-auto">
        <Formik
          validationSchema={validationSchema}
          initialValues={initialaValue}
          onSubmit={handleSubmit}
        >
          <Form className="p-4 grid lg:gap-10 lg:grid-cols-2">
            <div className="mb-3">
              <label htmlFor="name">Product Name:</label>
              <Field
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Product Name"
              />
              <ErrorMessage
                name="name"
                component={"p"}
                className="text-red-500"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price">Price:</label>
              <Field
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="number"
                name="price"
                id="price"
                placeholder="Enter Product Price"
              />
              <ErrorMessage
                name="price"
                component={"p"}
                className="text-red-500"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity">Quantity:</label>
              <Field
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="number"
                name="quantity"
                id="quantity"
                placeholder="Enter Product Quantity"
              />
              <ErrorMessage
                name="quantity"
                component={"p"}
                className="text-red-500"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sold">Sold:</label>
              <Field
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="number"
                name="sold"
                id="sold"
                placeholder="Enter Product Sold"
              />
              <ErrorMessage
                name="sold"
                component={"p"}
                className="text-red-500"
              />
            </div>
            <div className="mb-1">
              <label htmlFor="shipping">Shipping Charge:</label>
              <Field
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="number"
                name="shipping"
                id="shipping"
                placeholder="Enter Shipping Charge"
              />
              <ErrorMessage
                name="shipping"
                component={"p"}
                className="text-red-500"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category">Category:</label>
              <Field
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="text"
                name="category"
                id="category"
                placeholder="Enter Product Category"
              />
              <ErrorMessage
                name="category"
                component={"p"}
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col">
              <div className="w-full mb-1">
                <label htmlFor="image">Image:</label>
                <Field
                  className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                  type="file"
                  name="image"
                  id="image"
                  placeholder="Choose Product Image"
                />
                <ErrorMessage
                  name="image"
                  component={"p"}
                  className="text-red-500"
                />
              </div>
            </div>
            <div className="mb-3 w-full">
              <label htmlFor="desc">Description:</label>
              <Field
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                component="textarea"
                rows="4"
                type="text"
                name="desc"
                id="desc"
                placeholder="Product Description"
              />
              <ErrorMessage
                name="desc"
                component={"p"}
                className="text-red-500"
              />
            </div>
            <button
              type="submit"
              className="w-full text-center text-white bg-green-500 rounded-lg px-4 py-2"
            >
              Add Product
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default CreateProduct;
