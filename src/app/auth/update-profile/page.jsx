"use client";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import * as yup from "yup";

const UpdateProfile = () => {
  const { user } = useAuth();
  const router = useRouter();
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Email must valid").required("Email is required"),
    phone: yup.string().required("Phone is required"),
    country: yup.string().required("Country is required"),
  });

  const handleSubmit = async (e) => {
    try {
      const res = await axios.put("/api/auth/update-profile", e);
      const data = await res.data;
      toast.success(data.msg);
      router.push("/");
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
              Update Profile
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
                name="Phone"
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
                placeholder="Enter your Email"
              />
              <ErrorMessage
                name="country"
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

export default UpdateProfile;
