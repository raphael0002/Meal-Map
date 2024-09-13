/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
const ShowRatingAndComments = ({ recipeId }) => {
  const [ratingsAndComments, setRatingsAndComments] = useState(null);
  const { value } = useAuth();

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/recipe/commentsAndRatings/${recipeId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${value.token}`,
            },
          }
        );
        console.log(response.data.data);
        setRatingsAndComments(response.data.data);
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };

    fetchRecipeData();
  }, [recipeId]);

  if (!ratingsAndComments) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 rounded-lg w-full">
      <h2 className="text-xl font-semibold mb-4">Comments and Ratings</h2>
      <div className="flex flex-col">
        <ul className="space-y-4">
          {ratingsAndComments.length > 0 ? (
            ratingsAndComments.map((comment) => (
              <li key={comment._id} className="p-4 rounded-lg list-disc">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{comment.username}</span>
                  <span className="text-sm text-gray-600">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-800">{comment.comment}</p>
                <div className="flex items-center mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-red-500"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span className="ml-1 text-gray-600">
                    {comment.like} Likes
                  </span>
                </div>
                <hr className="mt-5 border-black" />
              </li>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ShowRatingAndComments;
