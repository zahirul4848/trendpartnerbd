import { FiChevronDown, FiLogOut} from "react-icons/fi";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PROFILE_LINKS } from "@/lib/data/links";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { resetCart } from "@/lib/features/global-slice";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const ref = useRef<any>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if(!open) return;
    function handleClick(event: MouseEvent) {
      if(ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }    
    window.addEventListener("click", handleClick);  
    return () => window.removeEventListener("click", handleClick);
  }, [open])
  
  return (
    <div className="flex items-center justify-center z-10">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          ref={ref}
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center rounded-md hover:text-sky-800 dark:hover:text-sky-300 transition-colors"
        >
          <span className="font-medium text-sm border hover:border-sky-800 dark:hover:border-sky-300 rounded-full w-5 h-5 flex justify-center items-center"><span>{Array.from(session?.user.name || "P")[0]}</span></span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 shadow-xl absolute top-10 left-[50%] w-48 overflow-hidden"
        >
          <div className="border-b border-gray-300 dark:border-gray-600 mb-1 pb-1">
            <span className="text-m p-2 whitespace-nowrap">{session?.user.name}</span>
          </div>
          {PROFILE_LINKS.map((link)=> (
            <motion.li
              key={link.id}
              variants={itemVariants}
              onClick={() => setOpen(false)}
            >
              <Link
                href={link.link}
                className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-gray-300 hover:text-sky-800 dark:hover:bg-gray-800 dark:hover:text-sky-300 transition-colors"
              >
                <motion.span variants={actionIconVariants}>
                  {link.Icon}
                </motion.span>
                <span>{link.text}</span>
              </Link>
            </motion.li>
          ))}
          <div className="border-b border-gray-300 dark:border-gray-600 mb-1 pb-1"/>
          <motion.li
            variants={itemVariants}
            onClick={() => {
              dispatch(resetCart({}));
              signOut();
              setOpen(false);
            }}
            className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-gray-300 hover:text-sky-800 dark:hover:bg-gray-800 dark:hover:text-sky-300 transition-colors cursor-pointer"
          >
            <motion.span variants={actionIconVariants}>
              <FiLogOut />
            </motion.span>
            <span>Log Out</span>
          </motion.li>
        </motion.ul>
      </motion.div>
    </div>
  );
};


export default ProfileDropdown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};