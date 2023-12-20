"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import axios from "axios";
import * as yup from "yup";
import GetCategories from "@/components/Categories";

const Category = () => {
  const validationSchema = yup.object({
    name: yup.string().required("Category Name is required"),
  });

  const initialValue = {
    name: "",
  };

  const handleSubmit = async (e, { resetForm }) => {
    try {
      const response = await axios.post("/api/category", e);
      const data = await response.data;
      toast.success(data.msg);
      location.reload();
      resetForm();
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col gap-10 items-center justify-center mb-10">
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValue}
          onSubmit={handleSubmit}
        >
          <Form className=" w-3/6 mx-auto">
            <h2 className="mb-8 text-center text-2xl font-semibold underline">
              Create Category
            </h2>
            <div className="mb-3">
              <label htmlFor="name">Category Name:</label>
              <Field
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="text"
                name="name"
                id="name"
                placeholder="Enter Category Name"
              />
              <ErrorMessage
                name="name"
                component={"p"}
                className="text-red-500"
              />
            </div>

            <div className="mb-2">
              <button
                type="submit"
                className="w-full text-center text-white bg-green-500 disabled:bg-green-400 rounded-lg px-4 py-2"
              >
                Create Category
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <GetCategories />
      </div>
    </>
  );
};

export default Category;
