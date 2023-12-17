"use-client";
// framer motion
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Listings from "../components/Listings";

// variants
import { fadeIn } from "../variants";

const Home = () => {
  return (
    <main className="bg-primary/30">
      <div className="container mx-auto flex flex-col">
        {/* Hero text section */}
        <Hero/>

        {/* Listings section */}
        <div className="">
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
