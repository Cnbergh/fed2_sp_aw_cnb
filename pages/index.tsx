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
            Claim <br />Your <span className="text-accent">Reward</span>
          </motion.h1>
          <motion.h3
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h3"
          >
            Sign Up and Receive a <span className="text-accent">1,000</span> Credit Bonus!
          </motion.h3>
          <motion.p
            variants={fadeIn("right", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-sm xl:max-w-xl mb-10 xl:mb-16"
          >
            Join our community today and start with an advantage. As a welcome gift, we're offering 1,000 credits to all new members. This is our way of saying thank you for choosing us. With these credits, you can immediately start exploring and enjoying all the unique features our platform has to offer. Don't miss this opportunity to get a head start!
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
