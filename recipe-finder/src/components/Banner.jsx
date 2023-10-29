import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import gambar from '../assets/Banner.png';

const Banner = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.3 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.5, staggerChildren: 0.1 },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const initialText = 'Petualangan Rasa Dimulai Dari Sini';
  const [animatedText, setAnimatedText] = useState('');

  useEffect(() => {
    const textAnimation = async () => {
      for (let i = 0; i < initialText.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Delay between each character
        setAnimatedText(initialText.substring(0, i + 1));
      }
    };
    textAnimation();
  }, []);

  return (
    <div className="max-w-[1264px] mx-auto px-2 sm:p-4 md:p-4 lg:p-4">
      <div className="relative">
        <div className="absolute w-full h-full text-white flex flex-col justify-center items-center">
          <motion.h1
            className="text-2xl font-semibold sm:text-4xl sm:font-bold text-center"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            {animatedText.split('').map((char, index) => (
              <motion.span key={index} variants={charVariants}>
                {char}
              </motion.span>
            ))}
          </motion.h1>
        </div>
        <motion.img
          src={gambar}
          alt="banner"
          className="rounded-3xl object-cover w-full h-auto shadow-lg"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        />
      </div>
    </div>
  );
};

export default Banner;
