"use client";
import axios from "axios";
import { useParams, usePathname } from "next/navigation";
const { createContext, useState, useContext, useEffect } = require("react");

export const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const fetchData = async () => {
    try {
      const res = await axios.get("/api/profile");
      const data = await res.data;
      setUser(data?.user);
    } catch (error) {
      return error;
    }
  };

  const pathName = usePathname();
  const [user, setUser] = useState(null);
  const params = useParams();

  useEffect(() => {
    //only auth data access this route
    const fetchRoute = [
      "/",
      "/update-profile", //using token
      "/updatepassword", //using token
      "/profile",
      "/login",
      "/register",
      "/users",
      `/users/${params.id}`, //using by id
      `/users/update/${params.id}`, //using by id
    ];
    if (fetchRoute.includes(pathName)) {
      fetchData();
    } else {
      setUser(null);
    }
  }, [pathName]);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
