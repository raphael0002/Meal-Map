import RecipeCard from "./RecipeCard";
import { useRecipe } from "../context/recipeProvider";

const DisplayRecipe = ({ category }) => {
  const { recipes } = useRecipe();
  return (
    <div
      key={1}
      className="grid gap-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 mb-16"
    >
      {recipes.map((recipe) => {
        console.log(category, recipe.category[0]);
        if (category === "All" || category === recipe.category[0]) {
          return <RecipeCard key={recipe._id} recipe={recipe} />;
        }
      })}
      {/* <RecipeCard recipes={recipes} /> */}
    </div>
  );
};

export default DisplayRecipe;
