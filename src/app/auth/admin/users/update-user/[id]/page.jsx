"use client";
import Loading from "@/components/Loading";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import * as yup from "yup";

const UpdateUser = ({ params }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(`/api/auth/users/${params.id}`)
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  const router = useRouter();
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Email must valid").required("Email is required"),
  });

  const handleSubmit = async (e) => {
    try {
      const res = await axios.put(`/api/auth/users/${params.id}`, e);
      const data = await res.data;
      toast.success(data.msg);
      router.push(`/auth/admin/users/${params.id}`);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  if (!user) {
    return <Loading />;
  }
  return (
    <>
      <div className="min-h-[82vh] w-full flex items-center justify-center">
        <Formik
          validationSchema={validationSchema}
          initialValues={user}
          onSubmit={handleSubmit}
        >
          <Form className=" w-3/6 mx-auto">
            <h2 className="mb-8 text-center text-2xl font-semibold underline">
              Update User
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

            <div className="mb-3">
              <label htmlFor="isAdmin">Admin:</label>
              <Field
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                name="isAdmin"
                as="select"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Field>
              <ErrorMessage
                name="isAdmin"
                component={"p"}
                className="text-red-500"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="isBanned">Banned:</label>
              <Field
                className="w-full py-2 px-4 rounded-lg ring-2 ring-indigo-400 outline-none border-none"
                name="isBanned"
                as="select"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Field>
              <ErrorMessage
                name="isAdmin"
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

export default UpdateUser;
