"use client";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import * as yup from "yup";

const UpdatePassword = (params) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const validationSchema = yup.object({
    email: yup.string().email("Email must valid").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be grater than 6 characters")
      .required("Password is required"),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password Should Match")
      .required("Confirm Password is required"),
  });

  const initialValue = {
    email: "",
    password: "",
    cpassword: "",
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      const response = await axios.put("/api/update-password", {
        ...e,
        token: params.searchParams.token,
      });
      const data = await response.data;
      toast.success(data.msg);
      router.push("/login");
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }

    if (!params.searchParams.token) {
      router.replace("/login");
      return <></>;
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
              Update Password
            </h2>

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
              <label htmlFor="cpassword">Confirm Password:</label>
              <Field
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="password"
                name="cpassword"
                id="cpassword"
                placeholder="Confirm your Password"
              />
              <ErrorMessage
                name="cpassword"
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
                {loading ? "Loading..." : "Update Password"}
              </button>
            </div>
            <div className="text-center  mb-2">
              <p>
                Already know?{" "}
                <Link className="underline text-blue-500" href={"/login"}>
                  Login
                </Link>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default UpdatePassword;
