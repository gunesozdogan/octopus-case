"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import { Navbar } from "../components/Navbar";
import { Filter } from "../components/Filter";
import { Products } from "../components/Products";
import { RootState } from "../store/store";

export default function MainPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const savedUserData = localStorage.getItem("user");
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      dispatch(setUser(userData));
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          setError("No access token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await fetch("https://dummyjson.com/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const userData = await response.json();

        dispatch(setUser(userData));

        localStorage.setItem("user", JSON.stringify(userData));
      } catch (err) {
        if (err instanceof Error) {
          setError(
            err.message || "An error occurred while fetching user data."
          );
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex w-screen flex-col h-screen">
      <Navbar user={user} />
      <div className="px-[80px] py-[32px] bg-secondaryWhite flex-1 flex gap-[32px]">
        <Filter />
        <Products />
      </div>
    </div>
  );
}
