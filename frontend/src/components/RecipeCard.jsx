/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Timer, Flame, Users } from "lucide-react";
const RecipeCard = ({ recipe }) => {
  return (
    <>
      <div
        key={recipe._id}
        className="bg-white rounded-md overflow-hidden relative shadow-md"
      >
        <div>
          <img
            className="w-full h-64 object-cover"
            src={recipe.image}
            alt={recipe.title}
          />
        </div>
        <div className="p-4">
          <h2 className="text-2xl text-[#CD5C08]">{recipe.title}</h2>
          <div className="flex justify-between mt-4 mb-4 text-gray-500">
            <div className="flex items-center">
              <Timer size={20} />
              <span className="ml-1 lg:text-xl">{recipe.prepTime} min</span>
            </div>
            <div className="flex items-center">
              <Flame size={20} />
              <span className="ml-1 lg:text-xl">{recipe.calories} cal</span>
            </div>
            <div className="flex items-center">
              <Users size={20} />
              <span className="ml-1 lg:text-xl">{recipe.servable}</span>
            </div>
          </div>
          <p className="mb-4 text-gray-500">{recipe.description}</p>
          <Link to={`/Overview/${recipe._id}/${recipe.title}`}>
            <button className="text-white bg-[#CD5C08] p-4 rounded-md w-full uppercase">
              View Recipe
            </button>
          </Link>
        </div>
        <div className="absolute top-0 right-0 mt-4 mr-4 bg-[#CD5C08] text-white rounded-full pt-1 pb-1 pl-4 pr-5 text-xs uppercase">
          <span>
            {recipe.category[1]
              ? `${recipe.category[0]} , ${recipe.category[1]}`
              : `${recipe.category[0]}`}
          </span>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
