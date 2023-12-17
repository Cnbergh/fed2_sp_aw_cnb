import { motion } from "framer-motion";

// variants
import { fadeIn } from "../variants";

import CtaBtn from "./Ui/CtaBtn"

const Hero = () => {
return (
<div className="p-5 sm:p-10 md:p-16 lg:p-20">
          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-accent/80"
          >
            Claim <br />Your Reward
          </motion.h2>
          <motion.h3
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h3 text-accent/80"
          >
            Sign Up <br className="sm:hidden"/>and Receive a <span className=" border-stone-800/60 border-2 rounded-[60%] p-1"><span className="text-stone-800 animate-pulse duration-75 border-stone-800 border-2 rounded-[50%] p-1">1,000</span></span> Credit Bonus!
          </motion.h3>
          <div className="flex flex-col lg:flex-row">
          <motion.p
            variants={fadeIn("right", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-md xl:max-w-xl xl:mx-1 xl:mb-5 text-accent/70 xl:pt-5 sm:flex"
          >
           Join our community and kickstart your experience with a 1,000 credit bonus. Our welcome gift lets you immediately explore and enjoy our platform's unique features. Sign up now <br className="sm:hidden"/>and don't miss out on <br className="sm:hidden"/>this exclusive <br className="sm:hidden"/>offer!"
          </motion.p>
          <motion.div variants={fadeIn('left', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='flex justify-center xl:hidden relative'>
            <CtaBtn />
          </motion.div>
          <motion.div
            variants={fadeIn('up', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='hidden xl:flex'
          >
            <CtaBtn />
          </motion.div>
          </div>
        </div>
)
}
export default Hero;