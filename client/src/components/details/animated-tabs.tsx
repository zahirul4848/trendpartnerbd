import React from 'react';
import { motion } from 'framer-motion';

type TAnimatedTabs = {
  activeSection: "details" | "reviews";
  setActiveSection: (section: "details" | "reviews") => void;
}


const AnimatedTabs = ({activeSection, setActiveSection}: TAnimatedTabs) => {
  return (
    <div className='my-10 grid grid-cols-2'>
      <button
        type='button'
        onClick={()=> setActiveSection("details")}
        className={`text-left relative border-b border-gray-200 dark:border-gray-800 pb-2 ${activeSection === "details" && "font-bold"}`}
      >
        Product Details
        {activeSection === "details" && (
          <motion.span
            // className="bg-gray-100 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"
            className="absolute border-b border-black dark:border-white inset-0"
            layoutId="activeSection"
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 30,
            }}
          ></motion.span>
        )}
      </button>
      <button
        type='button'
        onClick={()=> setActiveSection("reviews")}
        className={`text-left relative border-b border-gray-200 dark:border-gray-800 pb-2 ${activeSection === "reviews" && "font-bold"}`}
      >
        Rating & Reviews
        {activeSection === "reviews" && (
          <motion.span
            // className="bg-gray-100 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"
            className="absolute border-b border-black dark:border-white inset-0"
            layoutId="activeSection"
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 30,
            }}
          ></motion.span>
        )}
      </button>
    </div>
  )
}

export default AnimatedTabs;