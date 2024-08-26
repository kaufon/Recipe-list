import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
interface Recipe {
  id: number;
  name: string;
  ingredients: string;
  instruction: string;
  image: string;
}
const Recipes = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    const url = "/api/v1/recipes/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network not cool");
      })
      .then((res) => setRecipes(res))
      .catch(() => navigate("/"));
  }, []);
const allRecipes = (
  <div className="grid grid-cols-3 gap-4 p-4">
    {recipes.map((recipe, index) => (
      <div key={index} className="mb-4">
        <img
          src={recipe.image}
          className="object-cover w-full h-48"
          alt={`${recipe.name} image`}
        />
        <div className="p-4">
          <h5 className="text-xl font-semibold">{recipe.name}</h5>
          <Link
            to={`/recipe/${recipe.id}`}
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View recipe
          </Link>
        </div>
      </div>
    ))}
  </div>
);

    const noRecipe = (
    <div className="w-full h-1/2 flex items-center justify-center">
      <h4>
        No recipes.try <Link to={"/new_recipe"}>creating one</Link>
      </h4>
    </div>
    );
    return (
    <>
      <section className="bg-slate-400 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Recipes for every ocasion</h1>
          <p className="text-gray-600 text-lg mb-8">Try all!</p>
        </div>
      </section>
      <div className="py-16">
        <main className="container mx-auto px-4">
          <div className="flex justify-end mb-6">
            <Link to={"/recipe"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full p-4 border-2">Create new recipe</Link>
          </div>
          <div className="grid grid-cols-1">
            {recipes.length > 0 ? allRecipes : noRecipe}
          </div>
          <Link to={"/"} className="flex mt-8 text-blue-500 hover:text-blue-700 border-4 rounded-full p-4 font-bold text-2xl items-center justify-center">Home</Link>
        </main>
      </div>
    </>
    );
};
    export default Recipes;
