"use-client";
// framer motion
import { motion } from "framer-motion";

import Listings from "../components/Listings";

// variants
import { fadeIn } from "../variants";

const Home = () => {
  return (
    <main className="bg-primary/30">
      <div className="container mx-auto flex flex-col md:flex-row">
        {/* Hero text section */}
        <div className="md:w-1/2 p-8">
          <motion.h1
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1"
          >
            My <br /> Home <span className="text-accent">Page</span>
          </motion.h1>
          <motion.p
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-sm xl:max-w-xl mb-10 xl:mb-16"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            nostrum quam reprehenderit vero, tenetur voluptatem nulla aut
            aspernatur dolores ut.
          </motion.p>
        </div>

        {/* Listings section */}
        <div className="md:w-1/2">
          {/* listingsProp */}
          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            transition={{ duration: 1, ease: "easeInOut" }}
            className=""
          >
            <Listings />
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Home;
