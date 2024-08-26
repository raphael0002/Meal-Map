import { recipes } from "../data/data.js";

const RecipeCard = () => {
  return (
    <ul className="flex gap-11">
      {recipes.map((recipe) => {
        return (
          <li key={recipe.id} className="bg-slate-500 p-10">
            <h1>{recipe.name}</h1>
            <h1>{recipe.category}</h1>
            <h1>{recipe.timeToPrepare}</h1>
            <h1>{recipe.calories}</h1>
          </li>
        );
      })}
    </ul>
  );
};

export default RecipeCard;
