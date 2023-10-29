import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const RecipeForm = () => {
  const [recipes, setRecipes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [formData, setFormData] = useState({
    judulResep: "",
    waktuResep: "",
    gambarResep: "",
    bahanResep: "",
    langkahResep: "",
  });

  const [errors, setErrors] = useState({
    judulResep: "",
    waktuResep: "",
    gambarResep: "",
    bahanResep: "",
    langkahResep: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateFormData = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Regex untuk validasi
    const judulResepRegex = /^[a-zA-Z0-9\s]+$/;
    const waktuResepRegex = /^\d+$/;

    if (!formData.judulResep.match(judulResepRegex)) {
      newErrors.judulResep = "Judul resep hanya boleh berisi huruf dan angka.";
      valid = false;
    } else {
      newErrors.judulResep = "";
    }

    if (!formData.waktuResep.match(waktuResepRegex)) {
      newErrors.waktuResep = "Lama memasak harus berupa angka.";
      valid = false;
    } else {
      newErrors.waktuResep = "";
    }

    setErrors(newErrors);
    return valid;
  };

  useEffect(() => {
    // Ambil data resep dari API menggunakan Axios
    axios
      .get("https://653a628b2e42fd0d54d3c98d.mockapi.io/recipe")
      .then((response) => {
        setRecipes(response.data); // Assuming the API returns an array of recipe objects
      })
      .catch((error) => {
        console.error("Error fetching recipe data:", error);
      });
  }, []);

  const handleDelete = (recipeId) => {
    // Tampilkan dialog konfirmasi
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (confirmDelete) {
      // Kirim permintaan DELETE ke API menggunakan Axios
      axios
        .delete(
          `https://653a628b2e42fd0d54d3c98d.mockapi.io/recipe/${recipeId}`
        )
        .then((response) => {
          // Handle success
          console.log("Recipe deleted successfully:", response.data);

          // Perbarui susunan resep dengan menghapus resep yang dihapus
          setRecipes((prevRecipes) =>
            prevRecipes.filter((recipe) => recipe.id !== recipeId)
          );
        })
        .catch((error) => {
          // Handle error
          console.error("Error deleting recipe:", error);
        });
    }
  };

  const handleEdit = (recipe) => {
    setEditMode(true);
    setEditedRecipe(recipe);
    setFormData({
      judulResep: recipe.judulResep,
      waktuResep: recipe.waktuResep,
      gambarResep: recipe.gambarResep,
      bahanResep: recipe.bahanResep,
      langkahResep: recipe.langkahResep,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFormData()) {
      if (editMode) {
        // Kirim permintaan PUT untuk memperbarui resep
        axios
          .put(
            `https://653a628b2e42fd0d54d3c98d.mockapi.io/recipe/${editedRecipe.id}`,
            formData
          )
          .then((response) => {
            // Handle success
            console.log("Recipe updated successfully:", response.data);
            setEditMode(false);
            setEditedRecipe(null);
            setFormData({
              judulResep: "",
              waktuResep: "",
              gambarResep: "",
              bahanResep: "",
              langkahResep: "",
            });

            // Perbarui status resep dengan resep yang telah diedit
            setRecipes((prevRecipes) => {
              const updatedRecipes = prevRecipes.map((recipe) => {
                if (recipe.id === editedRecipe.id) {
                  return { ...recipe, ...formData };
                }
                return recipe;
              });
              return updatedRecipes;
            });
            alert("Recipe updated successfully!");
          })
          .catch((error) => {
            // Handle error
            console.error("Error updating recipe:", error);
            alert("Error updating recipe. Please try again.");
          });
      } else {
        // Kirim data ke API untuk membuat resep baru
        axios
          .post("https://653a628b2e42fd0d54d3c98d.mockapi.io/recipe", formData)
          .then((response) => {
            // Handle success
            console.log("Recipe created successfully:", response.data);
            setFormData({
              judulResep: "",
              waktuResep: "",
              gambarResep: "",
              bahanResep: "",
              langkahResep: "",
            });

            // Tambahkan resep yang baru dibuat ke status resep
            setRecipes((prevRecipes) => [...prevRecipes, response.data]);
            alert("Recipe created successfully!");
          })
          .catch((error) => {
            // Handle error
            console.error("Error creating recipe:", error);
            alert("Error creating recipe. Please try again.");
          });
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "l1ttafmy");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dd5xufhuf/image/upload",
        formData
      );
      setImageUrl(response.data.secure_url);
      alert(`Gambar berhasil diunggah. URL: ${response.data.secure_url}`);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Terjadi kesalahan saat mengunggah gambar.");
    }
  };

  return (
    <>
      <div className="bg-white min-h-screen flex items-center justify-center">
      <motion.div
          // Add animation to the entire form using `animate` and `initial` properties
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-md max-w-xl w-full mx-4 md:mx-auto md:my-8 min-[320px]:my-8"
        >
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Tambahkan Resep Baru</h1>
          </div>
          
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">
                Unggah Gambar
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="image"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-brandPrimary"
              />
              {previewUrl && (
                <img src={previewUrl} alt="Preview" className="w-64 h-64" />
              )}
              <button onClick={handleUpload} className="mt-2 p-2 bg-brandPrimary hover:bg-neutralDGray text-white rounded-md focus:outline-none">Unggah Gambar</button>
              {imageUrl && <div>URL Gambar: {imageUrl}</div>}
            </div>
          
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">
                Judul Resep
              </label>
              <input
                type="text"
                id="judulResep"
                value={formData.judulResep}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-brandPrimary"
              />
              <p className="text-red-500 text-xs">{errors.judulResep}</p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">
                Lama Memasak
              </label>
              <input
                type="number"
                id="waktuResep"
                value={formData.waktuResep}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-brandPrimary"
              />
              <p className="text-red-500 text-xs">{errors.waktuResep}</p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">
                URL Gambar Resep
              </label>
              <input
                type="text"
                id="gambarResep"
                value={formData.gambarResep}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-brandPrimary"
              />
              <p className="text-red-500 text-xs">{errors.gambarResep}</p>
            </div>
          
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-600"
              >
                Bahan-bahan
              </label>
              <textarea
                id="bahanResep"
                value={formData.bahanResep}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-brandPrimary"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">
                Langkah-langkah
              </label>
              <textarea
                id="langkahResep"
                value={formData.langkahResep}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-brandPrimary"
              />
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-brandPrimary text-white p-3 rounded-lg hover:bg-neutralDGray"
              >
                {editMode ? "Save" : "Submit"}
              </button>
            </div>
          </form>
          </motion.div>
      </div>
      <div className="bg-white min-h-screen flex items-center justify-center mb-4">
  <div className="max-w-5xl mx-auto p-4 bg-white shadow-md rounded-2xl">
    <h2 className="text-3xl font-bold text-slate-950 mb-4">Daftar Resep</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-brandPrimary">
          <tr className="text-white">
            <th className="px-6 py-3 text-center w-1/6">Judul Resep</th>
            <th className="px-6 py-3 text-center w-1/6">Lama Memasak</th>
            <th className="px-6 py-3 text-center w-2/6">Gambar</th>
            <th className="px-6 py-3 text-center w-2/6">Bahan-bahan</th>
            <th className="px-6 py-3 text-center w-2/6">Langkah-langkah</th>
            <th className="px-6 py-3 text-center w-1/6">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {recipes.map((recipe, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-slate-50" : "bg-white"}
            >
              <td className="px-6 py-4 whitespace-nowrap border">
                {recipe.judulResep}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border">
                {recipe.waktuResep}
              </td>
              <td className="px-6 py-4 border">
                <img
                  src={recipe.gambarResep}
                  alt={recipe.judulResep}
                  className="w-24 h-24 rounded-lg"
                />
              </td>
              <td className="px-6 py-4 border">{recipe.bahanResep}</td>
              <td className="px-6 py-4 border">{recipe.langkahResep}</td>
              <td className="px-6 py-4 border">
                <button
                  onClick={() => handleEdit(recipe)}
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="bg-red-500 text-white p-2 rounded-md hover-bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>



    </>
  );
};

export default RecipeForm;
