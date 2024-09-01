import { useRecipe } from "../context/recipeProvider";
import RecipeCard from "../components/RecipeCard";

const MyRecipesPage = () => {
  const { recipes } = useRecipe();
  console.log(recipes);
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
