"use client";

import { useEffect, useState } from "react";
import Input from "../Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";

const initialState = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (event) => {
    setError("");
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "All fields are required!",
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email format!",
      });
      return;
    }

    if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 8 characters long!",
      });
      return;
    }

    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
        });
        setIsLoading(false);
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong, please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container">
      <form
        onSubmit={handleSubmit}
        className="border-2 border-gray-300 rounded-lg max-w-sm mx-auto px-8 py-6 space-y-5"
      >
        <h2 className="text-center text-2xl font-bold">Login</h2>
        <Input
          label="Email"
          type="text"
          name="email"
          placeholder="Your Email"
          onChange={handleChange}
          value={state.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Your Password"
          onChange={handleChange}
          value={state.password}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>

        <p className="text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </form>
    </section>
  );
};

export default LoginForm;
