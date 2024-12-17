"use client";
import { useEffect, useState } from "react";
import Input from "../Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const SignupForm = () => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const handleChange = (event) => {
    setError("");
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = state;
    if (!name || !email || !password) {
      setError("All fields are required");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Invalid email format");
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address!",
      });
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 8 characters long!",
      });
      return;
    }

    try {
      setIsLoading(true);
      const newUser = {
        name,
        email,
        password,
      };
      const response = await fetch("http://localhost:3000/api/signup", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newUser),
      });

      if (response?.status === 201) {
        setSuccess("Registration successful!");
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Your account has been created. Redirecting to login...",
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          router.push("/login", { scroll: false });
        }, 2000);
      } else {
        setError("Oops! This email already has an account.");
        Swal.fire({
          icon: "error",
          title: "Account Exists",
          text: "This email already has an account. Please try logging in.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong! Please try again later.",
      });
    }

    setIsLoading(false);
  };

  return (
    <section className="container">
      <form
        onSubmit={handleSubmit}
        className="border-2 border-paragraphColor rounded-lg max-w-sm mx-auto px-8 py-6 space-y-5"
      >
        <h2 className="text-center special-word">Sign up</h2>

        <Input
          label="Name"
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          value={state.name}
        />

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
          placeholder="Password"
          onChange={handleChange}
          value={state.password}
        />

        {error && <div className="text-red-700 text-center">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}

        <button type="submit" className="btn w-full">
          {isLoading ? "Loading" : "Sign Up"}
        </button>
        <p className="text-blue-500 text-center">
          Already have account? <Link href={"/login"}>Login</Link>
        </p>
      </form>
    </section>
  );
};

export default SignupForm;
