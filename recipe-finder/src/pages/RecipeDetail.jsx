import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://653a628b2e42fd0d54d3c98d.mockapi.io/recipe/${id}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipe details: ", error);
      });
  }, [id]);

  const containerVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden my-4 p-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.img
        className="w-full h-64 object-cover object-center rounded-2xl"
        src={recipe.gambarResep}
        alt="#"
        variants={itemVariants}
      />
      <div className="p-4">
        <motion.h2 className="text-2xl font-semibold" variants={itemVariants}>
          {recipe.judulResep}
        </motion.h2>
        <motion.p className="text-gray-600" variants={itemVariants}>
          {recipe.waktuResep} menit
        </motion.p>
        <motion.h3 className="mt-4 text-lg font-semibold" variants={itemVariants}>
          Bahan-bahan:
        </motion.h3>
        <motion.ul className="list-disc pl-6" variants={itemVariants}>
          {recipe.bahanResep &&
            recipe.bahanResep.split("\n").map((bahan, index) => (
              <motion.li key={index} variants={itemVariants}>
                {bahan}
              </motion.li>
            ))}
        </motion.ul>
        <motion.h3 className="mt-4 text-lg font-semibold" variants={itemVariants}>
          Langkah-langkah:
        </motion.h3>
        <motion.ol className="list-decimal pl-6" variants={itemVariants}>
          {recipe.langkahResep &&
            recipe.langkahResep.split("\n").map((langkah, index) => (
              <motion.li key={index} variants={itemVariants}>
                {langkah}
              </motion.li>
            ))}
        </motion.ol>
      </div>
    </motion.div>
  );
};

export default RecipeDetail;
