//CSS
import '../styles/global.css';
// components
import Layout from '../components/Layout';

// router
import { useRouter } from 'next/router';

// framer motion
import { AnimatePresence, motion } from 'framer-motion';

export default function MyApp({ Component, pageProps }) {
    const router = useRouter();
    return (
      <Layout>
        <AnimatePresence mode='wait'>
          <motion.div key={router.route} className='h-full'>
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    );
  }