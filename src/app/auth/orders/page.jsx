"use client";
// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const YourOrders = () => {
  // const { user } = useAuth();
  // const router = useRouter();

  // if (!user) {
  //   router.push("/auth/login");
  // }
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  return (
    <>
      <div>
        <h2>Your Cart</h2>
        {cart.length > 0 ? (
          <>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <p>{item.name}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p>your cart is empty</p>
          </>
        )}
      </div>
    </>
  );
};

export default YourOrders;
