"use client";
import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const UpdatePass = () => {
  const validationSchema = yup.object({
    password: yup
      .string()
      .min(6, "New Password must be grater than 6 characters")
      .required("New Password is required"),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "New Password Should Match")
      .required("Confirm New Password is required"),
  });
  const initialValue = {
    password: "",
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    try {
      const response = await axios.put("/api/auth/updatepassword", e);
      const data = await response.data;
      toast.success(data.msg);
      router.push("/auth/profile");
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
              Update Password
            </h2>
            <div className="mb-3">
              <label htmlFor="name">New Password:</label>
              <Field
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="password"
                name="password"
                id="password"
                placeholder="Enter Your New Password"
              />
              <ErrorMessage
                name="password"
                component={"p"}
                className="text-red-500"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword">Confirm New Password:</label>
              <Field
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                type="password"
                name="cpassword"
                id="cpassword"
                placeholder="Confirm Your New Password"
              />
              <ErrorMessage
                name="cpassword"
                component={"p"}
                className="text-red-500"
              />
            </div>

            <div className="mb-2">
              <button
                type="submit"
                className="w-full text-center text-white bg-green-500 rounded-lg px-4 py-2"
              >
                Update Password
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default UpdatePass;
