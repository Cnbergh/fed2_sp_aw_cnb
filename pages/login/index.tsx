// API fetch
import {loginUser} from '../api/api'

// Next Router
import { useRouter } from "next/router";

// next link
import Link from "next/link";

// useState
import { useState } from "react";

// framer motion
import { motion } from 'framer-motion';

// variants
import { fadeIn } from '../../variants';

// components
import Error from '../../components/Ui/Error';
import { useAuth } from '../../components/AuthContext';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { login } = useAuth(); 
  const router = useRouter();

  const navigateToHome = () => {
    setTimeout(() => {
        router.push('/');
    }, 2000);
  };
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;
    const payload = {
      email: email.value,
      password: password.value,
    };

    try {
      setIsLoading(true);
      const res = await loginUser(payload); // Use loginUser
      setData(res);
      await login(payload); // Use AuthContext Login
      setIsSuccess(true);
      navigateToHome();
    } catch (error) {
      console.warn("An error occurred", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

if (error) return <Error>An error occurred: {error?.message}</Error>;

  return (
    <main className="h-full bg-primary/30">
      {/* text */}
      <div className="container mx-auto py-32 text-center xl:text-left flex items-center justify-center h-full">
        <div className="text-center flex flex-col justify-center xl:pt-40 xl:text-left h-full container mx-auto">
          {/* title */}
          <motion.h1
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1"
          >
            My <br /> Login <span className="text-accent">Page</span>
          </motion.h1>
          {/* subtitle */}
          <motion.p
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            nostrum quam reprehenderit vero, tenetur voluptatem nulla aut
            aspernatur dolores ut.
          </motion.p>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {isSuccess ? (
          <section>
            <p className="text-center text-green-900">
              👋 Hi {data?.name}. You will now redirect to the home page!
            </p>
          </section>
        ) : (
          <section>
            <div className="w-full mt-1 bg-orange-200 border-2 border-orange-100 rounded-3xl md:mt-2 sm:max-w-md xl:p-1 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 sm:space-y-5 md:space-y-7 sm:p-8">
                <h2 className="font-bold leading-tight tracking-tight text-gray-800 text-l sm:text-xl md:text-2xl lg:text-2xl dark:text-white">
                  Sign in to your account
                </h2>
                <form className="p-1 space-y-4 md:space-y-6" action="/profile" onSubmit={handleOnSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Email"
                        autoComplete="email"
                        className="bg-neutral-100 border-2 border-orange-100 text-gray-900 leading-tight tracking-tight sm:text-sm rounded-3xl focus:ring-primary-600 focus:border-primary-600 block w-full min-w-[220px] sm:min-w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="Password"
                      autoComplete="current-password"
                      minLength={8}
                      className="bg-neutral-100 border-2 border-orange-100 text-gray-900 leading-tight tracking-tight sm:text-sm rounded-3xl focus:ring-primary-600 focus:border-primary-600 block w-full min-w-[220px] sm:min-w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 ml-2 border border-gray-100 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                      </div>
                      <div className="ml-1 text-sm">
                        <label htmlFor="remember" className="text-xs font-light text-gray-600 dark:text-gray-300 sm:text-xs md:text-xs lg:text-sm">Remember me</label>
                      </div>
                    </div>
                    <a href="#" className="ml-1 text-xs font-medium text-gray-700 dark:text-gray-400 sm:text-sm md:text-sm lg:text-sm text-primary-600 hover:underline">Forgot password?</a>
                  </div>
                  <div>
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="w-full px-4 py-2 my-2 leading-tight tracking-tight text-white bg-blue-500 border-2 border-blue-500 rounded-3xl hover:border-blue-400 shadow-custom"
                    >
                      {isLoading ? "signing in" : "Login"}
                    </button>
                    <p className="text-xs font-light text-gray-700 sm:text-sm dark:text-gray-400">Not a member?{" "}
                      <Link href={`/signup`} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                      >
                        Sign up now
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </section >
        )
        }
      </div>
      </div>
    </main>
  );
};

export default Login;
