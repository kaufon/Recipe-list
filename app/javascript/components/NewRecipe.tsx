import React, { useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";

const NewRecipe = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instruction, setInstruction] = useState("");
  const stripHtmlEntities = (str: string) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };
  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFunction: (event: string) => void,
  ) => {
    setFunction(event.target.value);
  };
  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = "api/v1/recipes/create";
    if (
      name.length == 0 ||
      ingredients.length == 0 ||
      instruction.length == 0
    ) {
      return;
    }
    const body = {
      name,
      ingredients,
      insctruciton: stripHtmlEntities(instruction),
    };
    console.log({body})
    const token = document
      .querySelector("meta[name=csrf-token]")
      ?.getAttribute("content");
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-TOKEN": token || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((reponse) => {
        if (reponse.ok) {
          return reponse.json();
        }
        throw new Error("no ok");
      })
      .then((response) => navigate(`/recipe/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <div className=" m-5 flex  h-full w-full items-center justify-center  ">
        <div className="flex flex-col space-y-4 justify-center items-center ">
          <h1 className="font-bold m-5 text-3xl text-gray-900 ">
            Add new recipe
          </h1>
          <div className="text-center flex ">
            <form
              onSubmit={onSubmit}
              className="flex items-center justify-center flex-col "
            >
              <div className="w-full max-w-md">
                <label htmlFor="recipeName">Recipe Name</label>
                <input
                  type="text"
                  name="name"
                  id="recipeName"
                  className="block text-center text-sm font-medium border-2 border-gray-400 rounded-full w-full"
                  required
                  onChange={(event) => onChange(event, setName)}
                />
              </div>
              <div className="w-full max-w-md">
                <label htmlFor="recipeIngredients">Ingredients</label>
                <input
                  type="text"
                  name="ingredients"
                  id="recipeIngredients"
                  className="block text-sm text-center font-medium border-2 border-gray-400 rounded-full w-full"
                  required
                  onChange={(event) => onChange(event, setIngredients)}
                />

                <small id="help" className="font-medium ">
                  Separe each ingredient with comma
                </small>
              </div>
              <label htmlFor="instruction">Preparation</label>
              <textarea
                className="block text-sm font-medium text-left border-2 rounded-md border-gray-400 w-full"
                id="instruction"
                name="instruction"
                rows={5}
                required
                onChange={(event) => onChange(event, setInstruction)}
              />
              <button
                type="submit"
                className="border rounded-full bg-green-600 text-white p-4 m-3"
              >
                Create Recipe
              </button>
              <Link
                to={"/recipes"}
                className="border bg-red-600 rounded-full text-white p-4 m-3"
              >
                Back to recipes
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewRecipe;
