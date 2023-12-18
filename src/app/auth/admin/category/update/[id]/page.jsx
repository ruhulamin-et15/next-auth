"use client";
import Loading from "@/app/loading";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";

const UpdateCategory = ({ params }) => {
  const [category, setCategory] = useState(null);
  useEffect(() => {
    fetch(`/api/category/${params.id}`)
      .then((res) => res.json())
      .then((data) => setCategory(data.category));
  }, []);

  const router = useRouter();
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
  });

  const handleSubmit = async (e) => {
    try {
      const res = await axios.put(`/api/category/${params.id}`, e);
      const data = await res.data;
      toast.success(data.msg);
      router.push(`/auth/admin/category/${params.id}`);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  if (!category) {
    return <Loading />;
  }
  return (
    <>
      <div className="min-h-[82vh] w-full flex items-center justify-center">
        <Formik
          validationSchema={validationSchema}
          initialValues={category}
          onSubmit={handleSubmit}
        >
          <Form className=" w-3/6 mx-auto">
            <h2 className="mb-8 text-center text-2xl font-semibold underline">
              Update Category
            </h2>
            <div className="mb-3">
              <Field
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="text"
                name="name"
                id="name"
                autofocus="true"
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
                className="w-full text-center text-white bg-green-500 rounded-lg px-4 py-2"
              >
                Update
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default UpdateCategory;
