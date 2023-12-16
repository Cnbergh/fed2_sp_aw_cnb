"use-client"
import React from 'react';
// API fetch
import { registerUser, loginUser } from "../api/api";
// Next Router
import { useRouter } from "next/router";
// next link
import Link from "next/link";
// framer motion
import { motion } from "framer-motion";
// variants
import { fadeIn } from "../../variants";

import { useState } from "react";
// icons
import { BsArrowRight } from "react-icons/bs";
// components
import Error from "../../components/Ui/Error";
import { useAuth } from "../../components/AuthContext";

const SignUp = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;
    let errorMessages = [];
    let emailValid = /\S+@\S+\.\S+/.test(email);

    if (!emailValid) errorMessages.push("Invalid email. Must be a stud.noroff.no or noroff.no");
    if (password.length < 4)
      errorMessages.push("Password must be at least 4 characters");
    if (password !== confirmPassword)
      errorMessages.push("Passwords do not match.");

    if (errorMessages.length === 0) {
      try {
        setIsLoading(true);
        await registerUser({ username, email, password });
        const loginData = await loginUser({ email, password });
        login(loginData.accessToken);
        router.push("/");
      } catch (error) {
        setError("Registration failed");
      } finally {
        setIsLoading(false);
      }
    } else {
      setError(errorMessages.join(" "));
    }
  };
  return (
    <main className="h-full bg-primary/30">
      {/* Text section */}
      <div className="container mx-auto py-32 text-center xl:text-left flex flex-col items-center justify-center h-full">
        <div className="text-center flex flex-col justify-center xl:pt-40 xl:text-left h-full mx-auto">
          {/* Title and subtitle */}
          <motion.h1
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1"
          >
            Claim
            <br /> Your <span className="text-accent">Reward</span>
          </motion.h1>
          {/* subtitle */}
          <motion.p
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16"
          >
            Sign Up and Receive a 1,000 Credit Bonus!
          </motion.p>
          {error && <Error errorKey={error} message={error} />}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <section className="text-center flex flex-col justify-center xl:pt-10 xl:text-left h-full mx-auto">
            {/* form */}
            <motion.form
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex-1 flex flex-col gap-6 w-full mx-auto"
              onSubmit={handleSubmit}
            >
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="username"
                autoComplete="username"
                className="input"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
                autoComplete="email"
                className="input"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                autoComplete="current-password"
                minLength={8}
                className="input"
                value={formData.password}
                onChange={handleChange}
              />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm Password"
                autoComplete="current-password"
                minLength={8}
                className="input"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn w-full border-2 rounded-full border-white/50 max-w-[700px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group color-accent"
                >
                  <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500">
                    {isLoading ? "signing in" : "Sign up"}
                  </span>

                  <BsArrowRight className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]" />
                </button>
              </div>
            </motion.form>
            <motion.p
              variants={fadeIn("right", 0.8)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16 pt-2 xl:pt-4"
            >
              Already have an account?{" "}
              <Link
                href={`/login`}
                className="font-semibold leading-6 text-accent"
              >
                Login
              </Link>
            </motion.p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
