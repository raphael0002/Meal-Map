import { useAuth } from "../context/authContext";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import { useEffect, useState } from "react";

const fetchRecipeByCook = async (value, setRecipes) => {
  try {
    const response = await axios.get("http://localhost:3000/api/cook/recipes", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${value.token}`,
      },
    });
    setRecipes(response.data.data);
  } catch (e) {
    console.error("Error fetching recipes:", e);
  }
};

const MyRecipesPage = () => {
  const { value } = useAuth();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipeByCook(value, setRecipes);
  }, [value]);

  return (
    <div
      key={1}
      className="grid gap-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 mb-16"
    >
      {recipes.map((recipe) => {
        if (recipe.cook) {
          return <RecipeCard key={recipe._id} recipe={recipe} />;
        }
      })}
    </div>
  );
};

export default MyRecipesPage;
