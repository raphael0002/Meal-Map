import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";

const recipeContext = createContext();

const fetchRecipes = async (value, setRecipes) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/recipe/recipes`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${value.token}`,
        },
      }
    );
    // console.log(response.data);
    setRecipes(response.data.recipe.recipes);
  } catch (error) {
    console.log(error);
  }
};

const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const { value } = useAuth();
  useEffect(() => {
    fetchRecipes(value, setRecipes);
  }, [value]);

  return (
    <recipeContext.Provider value={{ recipes }}>
      {children}
    </recipeContext.Provider>
  );
};

const useRecipe = () => useContext(recipeContext);

export { RecipeProvider, useRecipe };
