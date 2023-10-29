import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaLinkedin,
} from "react-icons/fa6";
import { motion } from "framer-motion";
const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <motion.footer
      className="bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <motion.div variants={itemVariants}>
            <Link
              to={"/"}
              className="logo font-semibold text-2xl md:cursor-pointer text-slate-950"
            >
              Recipe<span className="text-brandPrimary">Finder</span>
            </Link>
            <p className="mt-4 max-w-xs text-gray-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non
              cupiditate quae nam molestias.
            </p>

            <ul className="mt-8 flex gap-6 text-2xl ">
              <li>
                <a
                  href="link_facebook"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <FaFacebook />
                </a>
              </li>

              <li>
                <a
                  href="link_instagram"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <FaInstagram />
                </a>
              </li>

              <li>
                <a
                  href="link_twitter"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <FaXTwitter />
                </a>
              </li>

              <li>
                <a
                  href="link_linkedin"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <FaLinkedin />
                </a>
              </li>
            </ul>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
            <motion.div variants={itemVariants}>
              <p className="font-medium text-gray-900">Company</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to={"/"}
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to={"buat"}
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Buat
                  </Link>
                </li>

                <li>
                  <Link
                    to={"openai"}
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    OpenAI
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="font-medium text-gray-900">Helpful Links</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Contact
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    FAQs
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Live Chat
                  </a>
                </li>
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-900">
                Subscribe to Our Newsletter
              </h3>
              <p className="mt-2 text-gray-500">
                Get the latest recipes and updates delivered to your inbox.
              </p>

              <form className="mt-4 flex items-center">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="px-4 py-2 w-full  border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brandPrimary"
                />
                <button
                  type="submit"
                  className="px-2 py-2 bg-brandPrimary text-white rounded-md hover:bg-opacity-80 transition ml-2"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>
          </div>
        </div>
        <hr />
        <motion.p
          className="text-center text-xs text-gray-500 mt-8"
          variants={itemVariants}
        >
          &copy; 2022. Company Name. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;
