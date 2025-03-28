import React from 'react';
import { FiShoppingCart, FiHeart, FiSettings} from "react-icons/fi";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

type TProfileAnimatedTabs = {
  activeSection: "wishlist" | "orders" | "settings";
  setActiveSection: (section: "wishlist" | "orders" | "settings") => void;
}


const ProfileAnimatedTabs = ({activeSection, setActiveSection}: TProfileAnimatedTabs) => {
  const router = useRouter();
  const handleQueryParams = (activeSection: "wishlist" | "orders" | "settings")=> {
    router.replace(`/account/profile?section=${activeSection}`);
    setActiveSection(activeSection);
  }

  return (
    <div className='my-10 grid grid-cols-3'>
      <button
        type='button'
        onClick={()=> handleQueryParams("wishlist")}
        className={`flex items-center gap-2 relative border-b border-gray-200 dark:border-gray-800 pb-2 ${activeSection === "wishlist" && "font-bold"}`}
      >
        <FiHeart/> Saved List
        {activeSection === "wishlist" && (
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
        onClick={()=> handleQueryParams("orders")}
        className={`flex items-center gap-2 relative border-b border-gray-200 dark:border-gray-800 pb-2 ${activeSection === "orders" && "font-bold"}`}
      >
        <FiShoppingCart/> Orders
        {activeSection === "orders" && (
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
        onClick={()=> handleQueryParams("settings")}
        className={`flex items-center gap-2 relative border-b border-gray-200 dark:border-gray-800 pb-2 ${activeSection === "settings" && "font-bold"}`}
      >
        <FiSettings/> Settings
        {activeSection === "settings" && (
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

export default ProfileAnimatedTabs;