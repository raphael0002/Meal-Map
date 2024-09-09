import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useRecipe } from "../context/recipeProvider";

const MealPlannerPage = () => {
  const { value } = useAuth();
  const [planner, setPlanner] = useState([]);
  const { recipes } = useRecipe();

  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [plannedFor, setPlannedFor] = useState("");

  useEffect(() => {
    const fetchPlanner = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/planner",
          {
            headers: {
              Authorization: `Bearer ${value.token}`,
            },
          }
        );
        setPlanner(response.data.data);
      } catch (error) {
        console.error("Error fetching planner:", error);
      }
    };

    fetchPlanner();
  }, [value.token]);

  const handleAddPlan = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/planner",
        {
          recipeId: selectedRecipe,
          plannedFor: plannedFor,
        },
        {
          headers: {
            Authorization: `Bearer ${value.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPlanner([...planner, response.data.data]);
      setSelectedRecipe("");
      setPlannedFor("");
      window.location.reload(false);
    } catch (error) {
      console.error("Error adding meal plan:", error);
    }
  };

  const handleDeletePlan = async (planId) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/user/planner/${planId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${value.token}`,
          },
        }
      );
      setPlanner(planner.filter((plan) => plan._id !== planId));
    } catch (error) {
      console.error("Error deleting meal plan:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Meal Planner</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add a Meal Plan</h2>
        <div className="flex gap-4 mb-4">
          <select
            value={selectedRecipe}
            onChange={(e) => setSelectedRecipe(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Select a Recipe</option>
            {recipes.map((recipe) => (
              <option key={recipe._id} value={recipe._id}>
                {recipe.title}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={plannedFor}
            onChange={(e) => setPlannedFor(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />

          <button
            onClick={handleAddPlan}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Add Plan
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Your Meal Plans</h2>
        <ul>
          {planner.map((plan) => (
            <li
              key={plan._id}
              className="flex justify-between items-center p-2 border border-gray-300 rounded mb-5 bg-white shadow-md"
            >
              <div className="flex gap-5">
                {plan.recipe && (
                  <>
                    <img
                      src={plan.recipe.image}
                      alt={plan.recipe.title}
                      className="h-16 w-20 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{plan.recipe.title}</h3>
                      <p>
                        Planned for:{" "}
                        {new Date(plan.plannedFor).toLocaleDateString()}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => handleDeletePlan(plan._id)}
                className="p-2 bg-green-500 text-white rounded"
              >
                Completed
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MealPlannerPage;
