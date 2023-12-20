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
    phone: yup
      .string()
      .min(11, "Phone must be grater than 11 characters")
      .required("Phone is required"),
    country: yup.string().required("Country is required"),
  });

  const initialValue = {
    name: "",
    email: "",
    password: "",
    phone: "",
    country: "",
  };

  const handleSubmit = async (e, { resetForm }) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/register", e);
      const data = await response.data;
      toast.success(data.msg);
      resetForm();
      router.push("/auth/login");
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <>
      <div className="lg:min-h-screen flex flex-col items-center lg:justify-center">
        <h2 className="py-4 text-center text-2xl font-semibold underline">
          User Registration
        </h2>
        <div className="bg-green-300 lg:rounded-lg lg:w-3/5 md:w-4/5 w-full">
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValue}
            onSubmit={handleSubmit}
          >
            <Form className="mt-5 p-10">
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
              <div className="mb-3">
                <label htmlFor="phone">Phone:</label>
                <Field
                  className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Enter your Phone"
                />
                <ErrorMessage
                  name="phone"
                  component={"p"}
                  className="text-red-500"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="country">Country:</label>
                <Field
                  className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Enter your Country"
                />
                <ErrorMessage
                  name="country"
                  component={"p"}
                  className="text-red-500"
                />
              </div>
              <div className="mt-4 flex lg:justify-end">
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
                  <Link
                    className="underline text-blue-500"
                    href={"/auth/login"}
                  >
                    Login Here
                  </Link>
                </p>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Register;
