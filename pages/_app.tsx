//CSS
import "../styles/global.css";
// components
import { AuthProvider } from "../components/AuthContext";
import Layout from "../components/Layout";

// router
import { useRouter } from "next/router";

// framer motion
import { AnimatePresence, motion } from "framer-motion";

// AppProps
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AuthProvider>
      <Layout>
        <AnimatePresence mode="wait">
          <motion.div key={router.route} className="h-full">
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </AuthProvider>
  );
}
