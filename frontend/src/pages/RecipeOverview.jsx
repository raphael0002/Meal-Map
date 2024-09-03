import { useParams } from "react-router-dom";
import { useRecipe } from "../context/recipeProvider";
import axios from "axios";
import StarRating from "../components/ratingandcomment/StarRating";
import FeedbackModal from "../components/ratingandcomment/FeedbackModal";
import { useState } from "react";
import { useAuth } from "../context/authContext";

const RecipeOverview = () => {
  const { value } = useAuth();
  const { recipes } = useRecipe();
  const { recipeId } = useParams();
  const recipeData = recipes.find((recipe) => recipe._id === recipeId);
  console.log(recipeData);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);

  const handleRatingClick = (rate) => {
    setRating(rate);
    setShowModal(true);
  };

  const handleSubmitFeedback = async (comment) => {
    try {
      console.log(recipeData);
      const response = await axios.patch(
        `http://localhost:3000/api/recipe/commentsAndRatings/${recipeId}`,
        {
          rating,
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${value.token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setShowModal(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/user/shopping-list`,
        {
          ingredients: recipeData.ingredients,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${value.token}`,
          },
        }
      );
      console.log("Added to cart:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-[#FFF5E4] p-0 rounded-xl md:w-3/4 lg:w-full">
      <div className="relative rounded-none shadow-xl md:rounded-xl w-full">
        <img
          src={recipeData.image}
          alt={recipeData.title}
          className="rounded-none md:rounded-lg w-full h-[35rem] object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between">
          <h1 className="text-3xl">{recipeData.title}</h1>
          <StarRating rating={rating} onRatingClick={handleRatingClick} />
        </div>

        <p className="text-rose-red">{recipeData.description}</p>
      </div>
      <div className="flex flex-col gap-2 bg-[#C1D8C3] px-6 py-5 rounded-xl w-full">
        <h3 className="font-semibold text-blue-950 text-xl">
          Preparation time
        </h3>
        <ul className="flex flex-col gap-1 px-5 list-disc">
          {/* {recipeData.prepTime.map((timeTaken, index) => {
            const [boldPart, normalPart] = timeTaken.split(": ");
            return (
              <li key={index}>
                <p className="ml-5 text-rose-red">
                  <span className="font-semibold">{boldPart}</span>
                  <span>: {normalPart}</span>
                </p>
              </li>
            );
          })} */}
          <li>
            <span className="font-semibold">Cooking Time: </span>
            <span>{recipeData.prepTime} minutes</span>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4 text-rose-red w-full">
        <h2 className="text-2xl">Ingredients</h2>
        <ul className="flex flex-col gap-1 px-5 list-disc">
          {recipeData.ingredients.map((recipeItem, index) => {
            return (
              <li key={index}>
                <span className="ml-5">{recipeItem.name}</span>
                <span className="ml-1">x {recipeItem.quantity}</span>
              </li>
            );
          })}
          <button
            onClick={() => handleAddToCart()}
            className="bg-blue-500 text-white px-2 py-1 rounded-lg"
          >
            Add to Cart
          </button>
        </ul>
        <hr />
      </div>
      <div className="flex flex-col gap-4 text-rose-red w-full">
        <h2 className="text-2xl">Instructions</h2>
        <ul className="flex flex-col gap-1 px-5 list-decimal">
          {recipeData.steps.map((recipeStep, index) => {
            return (
              <li key={index}>
                <p className="ml-5">
                  <span className="font-semibold">{recipeStep}</span>
                </p>
              </li>
            );
          })}
        </ul>
        <hr />
      </div>
      <FeedbackModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmitFeedback}
      />
    </div>
  );
};

export default RecipeOverview;
