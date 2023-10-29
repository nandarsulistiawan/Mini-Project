import { useState, useEffect } from 'react';
import OpenAI from "openai";
import { motion } from 'framer-motion'; // Import motion from framer-motion

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const ChatAi = () => {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await openai.completions.create({
        model: "text-davinci-003",
        prompt: `Buatkan resep masakan berdasarkan bahan: ${userInput}`,
        temperature: 0.5,
        max_tokens: 500,
      });
      setResult(response.choices[0].text.trim());
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!loading && result && !showAnimation) {
      setShowAnimation(true);
      setDisplayedText(result.substring(0, textIndex + 1));
      setTextIndex(textIndex + 1);
    }
  }, [result, textIndex, loading, showAnimation]);

  useEffect(() => {
    if (showAnimation && textIndex < result.length) {
      const interval = setInterval(() => {
        setDisplayedText(result.substring(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      }, 100); // 
      return () => clearInterval(interval);
    }
  }, [result, textIndex, showAnimation]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-gray-100 w-full md:w-3/4 lg:w-1/2 mx-auto mt-8 rounded-lg shadow-lg mb-5"
    >
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          placeholder="Masukkan bahan untuk resep masakan"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </div>
      <button
        className="bg-brandPrimary text-white p-2 rounded-md hover:bg-neutralDGray"
        onClick={handleGenerate}
        disabled={loading || userInput.length === 0}
      >
        {loading ? "Generating..." : "Generate Resep"}
      </button>
      <div className="mt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-left border p-3 rounded-lg bg-white shadow-md overflow-y-auto h-64 md:h-72 lg:h-80"
        >
          {showAnimation ? displayedText : result}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChatAi;
