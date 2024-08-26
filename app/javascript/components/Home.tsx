import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="bg-transparent p-5">
      <div className="max-w-md mx-auto text-slate-600">
        <h1 className="text-4xl font-bold mb-4">Food recipes</h1>
        <p className="text-xl mb-6">List of recipes for homeade meal</p>
        <hr className="mb-8 border-gray-300 opacity-25" />
        <Link to={"/recipes"} className="text-white px-8 py-3 rounded-full hover:bg-opacity-80 transition-colors duration-300 bg-black" role="button">
          View Recipes
        </Link>
      </div>
    </div>
  </div>
);
