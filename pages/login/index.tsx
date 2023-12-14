// API fetch
import { loginUser } from "../api/api";

// Next Router
import { useRouter } from "next/router";

// next link
import Link from "next/link";

// useState
import { useState } from "react";

// framer motion
import { motion } from "framer-motion";

// variants
import { fadeIn } from "../../variants";
// icons
import { BsArrowRight } from "react-icons/bs";

// components
import Error from "../../components/Ui/Error";
import { useAuth } from "../../components/AuthContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const navigateToHome = () => {
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };
  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };

    const payload = {
      email: email.value,
      password: password.value,
    };

    try {
      setIsLoading(true);
      const res = await loginUser(payload);
      setData(res);
      await login(res.accessToken);
      setIsSuccess(true);
      navigateToHome();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to login. Please check your credentials.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-full bg-primary/30">
      {/* text & form */}
      <div className="container mx-auto py-32 text-center xl:text-left flex flex-col items-center justify-center h-full">
        <div className="text-center flex flex-col justify-center xl:pt-40 xl:text-left h-full mx-auto">
          {/* title */}
          <motion.h1
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1"
          >
            Login to <br /> your <span className="text-accent">account</span>
          </motion.h1>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {isSuccess ? (
            <section className="text-center flex flex-col justify-center xl:pt-10 xl:text-left h-full mx-auto">
              <motion.h2
                variants={fadeIn("down", 0.2)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16 pb-10 xl:pt-4">
                👋 Hi <span className="font-semibold leading-6 text-accent">{data?.name}</span>. Welcome!
              </motion.h2>
            </section>
          ) : (
            <section className="text-center flex flex-col justify-center xl:pt-10 xl:text-left h-full mx-auto">
              {/* form */}
              <motion.form
                variants={fadeIn("up", 0.4)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="flex-1 flex flex-col gap-6 w-full mx-auto"
                onSubmit={handleOnSubmit}
              >
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  autoComplete="email"
                  className="input"
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
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="input"
                      />
                    </div>
                    <div className="ml-1 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-xs font-light text-gray-600 dark:text-gray-300 sm:text-xs md:text-xs lg:text-sm"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="ml-1 text-xs font-medium text-gray-700 dark:text-gray-400 sm:text-sm md:text-sm lg:text-sm text-primary-600 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="btn w-full border-2 rounded-full border-white/50 max-w-[700px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group color-accent"
                  >
                    <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500">
                      {isLoading ? "signing in" : "Sign in"}
                    </span>

                    <BsArrowRight className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]" />
                  </button>
                </div>
              </motion.form>
              {error && <Error errorKey={error} message={error} />}
              {/* subtitle */}
              <motion.p
                variants={fadeIn("right", 0.5)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16 pt-2 xl:pt-4"
              >
                Not a member?{" "}
                <Link
                  href={`/signup`}
                  className="font-semibold leading-6 text-accent"
                >
                  Sign up now
                </Link>
              </motion.p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
};

export default Login;
