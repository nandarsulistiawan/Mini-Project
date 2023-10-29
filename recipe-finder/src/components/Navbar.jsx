import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion"; // Import motion and useAnimation
import Button from "./Button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const controls = useAnimation(); // Initialize motion controls

 

  // Define variants for staggered entrance
  const navVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  // Animate the mobile menu
  const mobileMenuVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.3 } },
  };

  const toggleMobileMenuAnimation = async () => {
    await controls.start(open ? "hidden" : "visible");
    setOpen(!open);
  };

  return (
    <motion.nav
      className="bg-white"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <div className="flex items-center justify-around">
        <div className="z-50 p-5 md:w-auto w-full flex justify-between md:px-0 lg:px-0 min-[320px]:px-5">
          <Link
            to={"/"}
            className="logo font-semibold text-2xl md:cursor-pointer text-slate-950"
          >
            Recipe<span className="text-brandPrimary">Finder</span>
          </Link>
          <motion.div
            className="text-3xl md:hidden"
            onClick={toggleMobileMenuAnimation}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
          </motion.div>
        </div>
        <motion.ul
          className="md:flex items-center gap-6 text-base hidden text-slate-700"
          initial="hidden"
          animate="visible"
        >
          <motion.li
            variants={navVariants}
            whileHover={{ scale: 1.1 }}
          >
            <Link
              to={"/"}
              className="px-4 inline-block hover:text-brandPrimary focus:text-brandPrimary"
            >
              Home
            </Link>
          </motion.li>
          <motion.li
            variants={navVariants}
            whileHover={{ scale: 1.1 }}
          >
            <Link
              to={"buat"}
              className="px-4 inline-block hover:text-brandPrimary focus:text-brandPrimary"
            >
              Buat
            </Link>
          </motion.li>
          <motion.li
            variants={navVariants}
            whileHover={{ scale: 1.1 }}
          >
            <Link
              to={"openai"}
              className="px-4 inline-block hover:text-brandPrimary focus:text-brandPrimary"
            >
              OpenAI
            </Link>
          </motion.li>
        </motion.ul>
        <motion.div
          className="md:block hidden"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          <Button />
        </motion.div>

        {/* Mobile Nav */}
        <motion.ul
          className={`
            md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4 md:cursor-pointer z-10
            duration-300 ${open ? "left-0" : "left-[-100%]"}
          `}
          variants={mobileMenuVariants}
        >
          <motion.li
            variants={navVariants}
            whileHover={{ scale: 1.1 }}
          >
            <Link
              to={"/"}
              className="py-3 px-3 inline-block hover:text-brandPrimary"
            >
              Home
            </Link>
          </motion.li>
          <motion.li
            variants={navVariants}
            whileHover={{ scale: 1.1 }}
          >
            <Link
              to={"buat"}
              className="py-3 px-3 inline-block hover:text-brandPrimary"
            >
              Buat
            </Link>
          </motion.li>
          <motion.li
            variants={navVariants}
            whileHover={{ scale: 1.1 }}
          >
            <Link
              to={"openai"}
              className="py-3 px-3 inline-block hover:text-brandPrimary"
            >
              OpenAI
            </Link>
          </motion.li>
          <motion.div
            className="py-5"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <Button />
          </motion.div>
        </motion.ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
