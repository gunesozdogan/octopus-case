"use client";

import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";

export default function MainPage() {
  const [user, setUser] = useState<{ firstName: string; lastName: string }>({
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        setUser(userData);
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex w-screen">
      <Navbar user={user} />
    </div>
  );
}
