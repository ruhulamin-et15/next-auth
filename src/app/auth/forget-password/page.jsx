"use client";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import * as yup from "yup";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const validationSchema = yup.object({
    email: yup.string().email("Email must valid").required("Email is required"),
  });

  const initialValue = {
    email: "",
  };

  const handleSubmit = async (e, { resetForm }) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/forget-password", e);
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
          Password Forget
        </h2>
        <div className="bg-green-300 lg:rounded-lg lg:w-3/5 md:w-4/5 w-full">
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValue}
            onSubmit={handleSubmit}
          >
            <Form className="mt-5 p-10">
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

              <div className="my-4 flex lg:justify-end">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full text-center text-white bg-green-500 disabled:bg-green-400 rounded-lg px-4 py-2"
                >
                  {loading ? "Loading..." : "Forget Password"}
                </button>
              </div>
              <div className="text-center  mb-2">
                <p>
                  Already know?{" "}
                  <Link
                    className="underline text-blue-500"
                    href={"/auth/login"}
                  >
                    Login
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

export default ForgetPassword;
