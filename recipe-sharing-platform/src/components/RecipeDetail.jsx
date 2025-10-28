import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import data from "../data.json";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const foundRecipe = data.find((item) => item.id === parseInt(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-xl">
        Recipe not found 😢
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-green-700 mb-4">
            {recipe.title}
          </h1>
          <p className="text-gray-600 mb-6">{recipe.summary}</p>

          {/* Example of ingredients and instructions */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            🥦 Ingredients
          </h2>
          <ul className="list-disc list-inside mb-6 text-gray-700">
            <li>1 cup flour</li>
            <li>2 eggs</li>
            <li>1 tsp salt</li>
            <li>1 cup milk</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            🍳 Instructions
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Mix all ingredients in a bowl.</li>
            <li>Heat a pan and add a little oil.</li>
            <li>Cook until golden brown on both sides.</li>
            <li>Serve hot and enjoy!</li>
          </ol>

          <div className="mt-8">
            <Link to="/">
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                ← Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
