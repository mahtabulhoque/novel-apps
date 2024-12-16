"use client";
import { useState } from "react";
import Input from "../Input";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const handleChange = (event) => {
    setError("");
    setState({ ...state, [event.target.name]: event.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = state;
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Invalid email format");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
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
        setSuccess("Registration successful");
        setTimeout(() => {
          router.push("/login", { scroll: false });
        }, 1000);
      } else {
        setError("Error Here");
      }
    } catch (error) {
      console.log(error);
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
