import { motion } from "framer-motion";

// variants
import { fadeIn } from "../variants";

const Hero = () => {
return (
<div className="p-20">
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
            className="xl:max-w-xl mb-10 xl:mb-16"
          >
            Join our community today and start with an advantage. As a welcome gift, we're offering 1,000 credits to all new members. This is our way of saying thank you for choosing us. With these credits, you can immediately start exploring and enjoying all the unique features our platform has to offer. Don't miss this opportunity to get a head start!
          </motion.p>
        </div>
)
}
export default Hero;