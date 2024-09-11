/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { Timer, Flame, Users, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DeleteBox from "./DeleteBox";
import axios from "axios";
import { useAuth } from "../context/authContext";
import ShareBox from "./ShareBox";

const RecipeCard = ({ recipe, user }) => {
  const { value } = useAuth();
  const navigate = useNavigate();
  const [showDeleteBox, setShowDeletebox] = useState(false);
  const [shareRecipeBox, setShareRecipeBox] = useState(false);

  const handleDeleteBoxToggle = () => {
    setShowDeletebox(!showDeleteBox);
  };

  const handleShareRecipeBoxToggle = () => {
    setShareRecipeBox(!shareRecipeBox);
  };

  const handleEdit = () => {
    navigate(`/EditRecipe/${recipe._id}/edit`, { state: { recipe } });
  };

  const handleDelete = (recipeId) => {
    console.log(recipeId);
    // Add the delete functionality here
    try {
      axios.delete(`http://localhost:3000/api/recipe/recipes/${recipeId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${value.token}`,
        },
      });
    } catch (e) {
      console.log("Error deleting recipe" + e);
    }

    alert("Delete functionality to be implemented");
  };

  return (
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
        <div className="flex justify-between">
          <h2 className="text-2xl text-[#CD5C08]">{recipe.title}</h2>
          <Share2 color="#242424" onClick={handleShareRecipeBoxToggle} />
        </div>

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

        <div className="flex justify-between flex-col">
          <div>
            <Link to={`/Overview/${recipe._id}/${recipe.title}`}>
              <button
                className={`text-white w-full bg-[#CD5C08] p-2 rounded-md`}
              >
                View Recipe
              </button>
            </Link>
          </div>

          {user === "cook" && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={handleEdit}
                className="text-white bg-yellow-500 py-2 px-4 rounded-md"
              >
                Edit
              </button>

              <button
                onClick={handleDeleteBoxToggle}
                className="text-white bg-red-500 py-2 px-4 rounded-md"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="absolute top-0 right-0 mt-4 mr-4 bg-[#CD5C08] text-white rounded-full pt-1 pb-1 pl-4 pr-5 text-xs uppercase">
          <span>
            {
              recipe.category.map((category) => {
                return category;
              }) + " "
              // category[1]
              //   ? ${recipe.category[0]} , ${recipe.category[1]}
              //   : ${recipe.category[0]}
            }
          </span>
        </div>
      </div>
      <DeleteBox
        showDeleteBox={showDeleteBox}
        onClose={() => setShowDeletebox(false)}
        onSubmit={handleDelete}
        recipeId={recipe._id}
      />

      <ShareBox
        show={shareRecipeBox}
        onClose={() => setShareRecipeBox(false)}
        link={`http://localhost:5173/Overview/${recipe._id}/${recipe.title}`}
      />
    </div>
  );
};

export default RecipeCard;
