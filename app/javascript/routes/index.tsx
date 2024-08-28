import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "../components/Home";
import Recipes from "../components/Recipes";
import Recipe from "../components/Recipe";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipe/:id" element={<Recipe/>}/>
    </Routes>
  </Router>
);