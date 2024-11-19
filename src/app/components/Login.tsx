"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userResponse = await fetch(
        `https://dummyjson.com/users/filter?key=email&value=${email}`
      );

      const userData = await userResponse.json();

      if (userData.users.length === 0) {
        setError("User not found with this email.");
        return;
      }

      const fetchedUsername = userData.users[0].username;

      const loginResponse = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: fetchedUsername,
          password: password,
          expiresInMins: 30,
        }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        setError(loginData.message || "Wrong username or password.");
        return;
      }

      console.log("Login successful:", loginData);

      router.push(`/dashboard?username=${fetchedUsername}`);

      localStorage.setItem("accessToken", loginData.accessToken);
      localStorage.setItem("username", fetchedUsername);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error during login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-[3] flex-col">
      <div className="flex items-center justify-center flex-col">
        <h2 className="font-inter font-bold text-[32px]">Welcome Octopus!</h2>
        <p className="text-[#94A3B8] text-[14px] font-normal">
          Manage your smart signage, watch your company grow.
        </p>
      </div>
      <form
        onSubmit={handleLogin}
        className="flex flex-col self-start w-full gap-[24px] px-[91px] py-[20px]"
      >
        <div className="flex flex-col gap-[10px]">
          <label className="font-inter text-[14px] font-medium" htmlFor="email">
            E-mail Address*
          </label>
          <input
            className="bg-[#f1f5f9] h-[44px] rounded-lg px-[16px] py-[12px] focus:outline-2 focus:outline-customGreen"
            placeholder="Enter your e-mail address"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label
            className="font-inter text-[14px] font-medium"
            htmlFor="password"
          >
            Password*
          </label>
          <input
            className="bg-[#f1f5f9] w-full h-[44px] rounded-lg px-[16px] py-[12px] focus:outline-2 focus:outline-customGreen"
            placeholder="Enter your password"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-[8px]">
          <input
            type="checkbox"
            className="border-1 border-[#CBD5E1] w-[20px] h-[20px] rounded"
          />
          <label htmlFor="">Remember me?</label>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full h-[44px] bg-customGreen rounded-lg text-white font-medium text-[14px]"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
