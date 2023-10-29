import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import CardRecipe from "./CardRecipe";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("https://653a628b2e42fd0d54d3c98d.mockapi.io/recipe")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleSearch = () => {
    setFilteredRecipes(
      recipes.filter((recipe) => {
        if (search === "") {
          return false; // No search input, hide all recipes
        } else if (
          recipe.judulResep.toLowerCase().includes(search.toLowerCase()) ||
          recipe.bahanResep.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        }
        return false;
      })
    );
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="mb-7 min-[320px]:py-5"
      >
        <div className="flex items-center">
          <input
            type="text"
            className="p-3 w-[100%] sm:w-[100%] h-[42px] text-brandPrimary bg-zinc-100 border focus:outline-none focus:ring-none text-[14px] sm:text-sm"
            placeholder="Search for recipes.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-3 text-white bg-brandPrimary"
            onClick={handleSearch}
          >
            <AiOutlineSearch className="text-white" />
          </motion.button>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredRecipes.map((recipe, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link to={`/recipe/${recipe.id}`}> {/* Menambahkan Link ke halaman detail resep */}
              <CardRecipe
                image={recipe.gambarResep}
                title={recipe.judulResep}
                duration={recipe.waktuResep}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Search;
