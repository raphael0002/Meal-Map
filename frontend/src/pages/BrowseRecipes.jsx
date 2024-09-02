import { useRecipe } from "../context/recipeProvider";
import ExploreMenu from "../components/ExploreMenu";
import { useState } from "react";
import DisplayRecipe from "../components/DisplayRecipe";

const BrowseRecipes = ({ searchQuery }) => {
  const [category, setCategory] = useState("All");
  const { recipes } = useRecipe();
  console.log(recipes);
  return (
    <div>
      <ExploreMenu category={category} setCategory={setCategory} />
      <DisplayRecipe category={category} searchQuery={searchQuery} />
    </div>
  );
};

export default BrowseRecipes;
