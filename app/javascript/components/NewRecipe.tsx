import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      instruction: stripHtmlEntities(instruction)
    }
    const token = document.querySelector('meta[name=csrf-token]')?.getAttribute("content")
    fetch(url,{
      method: "POST",
      headers:{
        "X-CSRF-TOKEN":token || "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then((reponse) => {
        if (reponse.ok) {
          return reponse.json()
          
        }
        throw new Error("response no ok")
      }).then((response) => navigate(`/recipe/${response.id}`)).catch((error) => console.log(error.message))
  };

  return (
  <>
    <div className="container m-5">
      <div className="flex flex-col space-y-4">
        <div className="text-center">
          <h1 className="font-normal mb-5 text-xl">
            Add new recipe
            </h1>
          <form onSubmit={onSubmit}>
            <div className="w-full max-w-md">
              <label htmlFor="recipeName">Recipe Name</label>
              <input type="text" name="name" id="recipeName" className="block text-sm font-medium text-gray-700" required onChange={(event) => onChange(event,setName)}/>
              </div>
            </form>
          </div>
        </div>
      </div>
      </>
  )
};
export default NewRecipe;
