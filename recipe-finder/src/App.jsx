import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import RecipeDetail from "./pages/RecipeDetail";
import Navbar from "./components/Navbar";
import RecipeForm from "./pages/RecipeForm";
import ChatAi from "./pages/ChatAi";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="buat" element={<RecipeForm />} />
        <Route path="openai" element={<ChatAi />} />
        <Route path="/recipe/:id" element={<RecipeDetail/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
