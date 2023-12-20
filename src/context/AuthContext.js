"use client";

import axios from "axios";
import { usePathname } from "next/navigation";
const { createContext, useState, useContext, useEffect } = require("react");

export const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const fetchData = async () => {
    try {
      const res = await axios.get("/api/auth/profile");
      const data = await res.data;
      setUser(data?.user);
    } catch (error) {
      return error;
    }
  };

  const pathName = usePathname();
  const [user, setUser] = useState(null);
  // const params = useParams();

  useEffect(() => {
    fetchData();
    // //only auth data access this route
    // const fetchRoute = [
    //   "/",
    //   "/auth/update-profile", //using token
    //   "/auth/updatepassword", //using token
    //   "/auth/profile",
    //   "/auth/login",
    //   "/auth/register",
    //   "/auth/admin/users",
    //   `/auth/admin/users/${params.id}`, //using by id
    //   `/auth/admin/users/update/${params.id}`, //using by id
    //   "/auth/admin/category",
    // ];
    // if (fetchRoute.includes(pathName)) {
    //   fetchData();
    // } else {
    //   setUser(null);
    // }
  }, [pathName]);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
