// framer motion
import { motion } from 'framer-motion';

// variants
import { fadeIn } from '../../variants';

const Profile = () => {
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
            My <br /> Profile <span className="text-accent">Page</span>
          </motion.h1>
          {/* subtitle */}
          <motion.p
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16"
          >P
          </motion.p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
