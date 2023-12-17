"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import * as yup from "yup";
import { useState } from "react";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Email must valid").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be grater than 6 characters")
      .required("Password is required"),
  });

  const initialValue = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (e, { resetForm }) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/register", e);
      const data = await response.data;
      toast.success(data.msg);
      resetForm();
      router.push("/login");
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <>
      <div className="min-h-[82vh] w-full flex items-center justify-center">
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValue}
          onSubmit={handleSubmit}
        >
          <Form className=" w-3/6 mx-auto">
            <h2 className="mb-8 text-center text-2xl font-semibold underline">
              User Registration
            </h2>
            <div className="mb-3">
              <label htmlFor="name">Name:</label>
              <Field
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="text"
                name="name"
                id="name"
                placeholder="Enter your Name"
              />
              <ErrorMessage
                name="name"
                component={"p"}
                className="text-red-500"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email:</label>
              <Field
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email"
              />
              <ErrorMessage
                name="email"
                component={"p"}
                className="text-red-500"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password:</label>
              <Field
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="password"
                name="password"
                id="password"
                placeholder="Enter your Password"
              />
              <ErrorMessage
                name="password"
                component={"p"}
                className="text-red-500"
              />
            </div>
            <div className="mb-2">
              <button
                disabled={loading}
                type="submit"
                className="w-full text-center text-white bg-green-500 disabled:bg-green-400 rounded-lg px-4 py-2"
              >
                {loading ? "Loading..." : "Register"}
              </button>
            </div>
            <div className="text-center  mb-2">
              <p>
                Already have an account?{" "}
                <Link className="underline text-blue-500" href={"/login"}>
                  Login Here
                </Link>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Register;
