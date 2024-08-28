import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface Recipe {
  id: number;
  name: string;
  ingredients: string;
  insctruciton: string;
  image: string;
}
const Recipe = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe>({
    id: 0,
    name: "",
    ingredients: "",
    insctruciton: "",
    image: "",
  });

  useEffect(() => {
    const url = `/api/v1/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network no ok");
      })
      .then((response) => setRecipe(response))
      .catch(() => navigate("/recipes"));
  }, [params.id]);
  const addHtmlEntities = (str: string) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };
  const ingredientList = () => {
    let ingredientList;

    if (recipe.ingredients.length > 0) {
      ingredientList = recipe.ingredients
        .split(",")
        .map((ingredient, index) => (
          <li key={index} className="list-item">
            {ingredient.trim()}
          </li>
        ));
    }
    return ingredientList;
  };
  const deleteRecipe = () => {
    const url = `/api/v1/destroy/${params.id}`;
    const token = document
      .querySelector("meta[name=csrf-token]")
      ?.getAttribute("content");
    fetch(url,{
      method: "DELETE",
      headers:{
        "X-CSRF-TOKEN": token ||"",
        "Content-Type": "application/json",
      },

    }).then((response)=>{
        if (response.ok) {
          return response.json()
          
        }
        throw new Error("No ok womp womp")
      }).then(() => navigate("/recipes")).catch((err) => console.log(err.message)) 
  };
  const recipeInstruction = addHtmlEntities(recipe.insctruciton);
  return (
    <div className="bg-white p-8">
      <div className="flex w-full items-center justify-between flex-col">
        <img
          src={recipe.image}
          alt={`${recipe.name} image`}
          className="w-48 h-48 rounded-full object-cover flex-1"
        />
        <h1 className="text-5xl font-bold text-gray-600 relative z-10">
          {recipe.name}
        </h1>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 mb-8">
            <ul className="space-y-4">
              <h5 className="mb-2 font-bold text-2xl ">Ingredients:</h5>
              {ingredientList()}
            </ul>
          </div>
          <div className="w-full h-px bg-black" />
          <div className="w-full px-4">
            <h5 className="mb-4 font-bold text-2xl">
              Preparation Instructions
            </h5>
            <div
              dangerouslySetInnerHTML={{
                __html: `${recipeInstruction}`,
              }}
            />
          </div>
          <div className="w-full px-4 mt-8">
            <button
              onClick={deleteRecipe}
              type="button"
              className="w-32 p-4 bg-red-500 text-white font-bold border-2 rounded-md"
            >
              Delete Recipe
            </button>
          </div>
        </div>
        <Link
          to="/recipes"
          className="flex mt-8 text-blue-500 hover:text-blue-700 border-4 rounded-full p-4 font-bold text-2xl items-center justify-center"
        >
          Back to recipes
        </Link>
      </div>
    </div>
  );
};
export default Recipe;
