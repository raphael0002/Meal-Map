import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";

const EditRecipePage = () => {
  const { recipeIdForEdit } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const recipeToEdit = location.state?.recipe || null;
  const [title, setTitle] = useState(recipeToEdit.title);
  const [description, setDescription] = useState(recipeToEdit.description);
  const [imgUrl, setImgUrl] = useState(recipeToEdit.image);
  const [ingredients, setIngredients] = useState(recipeToEdit.ingredients);
  const [instructions, setInstructions] = useState(recipeToEdit.steps);
  const [prepTime, setPrepTime] = useState(recipeToEdit.prepTime);
  const [calories, setCalories] = useState(recipeToEdit.calories);
  const [servable, setServable] = useState(recipeToEdit.servable);
  const [category, setCategory] = useState(recipeToEdit.category);
  const { value } = useAuth();

  const handleIngredientChange = (index, field, val) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = val;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const handleDeleteIngredient = () => {
    const newIngredients = [...ingredients];
    newIngredients.splice(newIngredients.length - 1, 1);
    setIngredients(newIngredients);
  };

  const handleCancel = () => {
    navigate("/My-Recipes"); // Revert to original data
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const recipeData = {
      title,
      description,
      ingredients,
      steps: instructions,
      calories,
      prepTime,
      servable,
      category,
      image: imgUrl || "",
    };
    console.log(recipeData);
    axios
      .patch(
        `http://localhost:3000/api/recipe/${recipeIdForEdit}/${title}`,
        recipeData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${value.token}`, // replace with your actual access token
          },
        },
        { new: true }
      )
      .then((response) => {
        console.log("Recipe created successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error creating recipe:", error);
        alert("Failed to create recipe. Please try again.");
      });

    // alert the user
    alert("Recipe created successfully!");
  };

  return (
    <div className="flex flex-col bg-[#FFF5E4] p-0 rounded-xl max-md:w-3/4 lg:w-auto">
      <h1 className="font-semibold text-3xl py-5 px-5">Create Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 px-10">
          <div className="flex gap-1">
            <div className="flex flex-col gap-4 ">
              <div className="flex gap-4 whitespace-nowrap">
                <label htmlFor="title">Recipe Name</label>
                <input
                  type="text"
                  value={title}
                  name="recipe-title"
                  id="title"
                  className="bg-[#C1D8C3] h-8 w-3/4 rounded-md"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex gap-3 whitespace-nowrap">
                <label htmlFor="title">Recipe Image</label>
                <input
                  type="text"
                  value={imgUrl}
                  name="recipe-image"
                  id="image-url"
                  className="bg-[#C1D8C3] h-8 w-3/4 rounded-md"
                  onChange={(e) => setImgUrl(e.target.value)}
                />
              </div>
              <div className="flex gap-8">
                <label htmlFor="title">Description</label>
                <textarea
                  value={description}
                  rows={100}
                  cols={80}
                  name="recipe-description"
                  id="description"
                  className="bg-[#C1D8C3] h-[10rem] w-3/4 rounded-md"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex *:flex ml-[32px] gap-3 w-5/6 *:gap-2 *:whitespace-nowrap">
                <div>
                  <label htmlFor="">Prep Time:</label>
                  <input
                    value={prepTime}
                    type="text"
                    name="prep-timeField"
                    id="prep-time"
                    className="bg-[#C1D8C3] h-8 w-full rounded-md"
                    onChange={(e) => setPrepTime(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="calories">Calories:</label>
                  <input
                    type="text"
                    value={calories}
                    name="caloriesField"
                    id="calories"
                    className="bg-[#C1D8C3] h-8 w-full rounded-md"
                    onChange={(e) => setCalories(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="category">Category:</label>
                  <input
                    type="text"
                    value={category}
                    name="categoryField"
                    id="category"
                    className="bg-[#C1D8C3] h-8 w-full rounded-md"
                    onChange={(e) => {
                      const categories = e.target.value.split(",");
                      setCategory(categories);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="servable">Servable:</label>
                  <input
                    type="text"
                    value={servable}
                    name="servableField"
                    id="servable"
                    className="bg-[#C1D8C3] h-8 w-full rounded-md"
                    onChange={(e) => setServable(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="w-[50%] h-auto">
              <img
                src={
                  imgUrl
                    ? imgUrl
                    : "https://www.foodandwine.com/thmb/fjNakOY7IcuvZac1hR3JcSo7vzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-pasta-sausage-basil-and-mustard-hero-06-cfd1c0a2989e474ea7e574a38182bbee.jpg"
                }
                alt="Recipe Image"
                className="h-auto w-auto rounded-md bg-[#C1D8C3]"
              />
            </div>
          </div>
          <div className="flex justify-evenly items-center gap-4">
            <div className="flex flex-row items-start gap-4 ml-3 w-full">
              <div className="flex gap-2 flex-col">
                <label htmlFor="">Ingredients:</label>
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2 w-full *:py-2 *:px-2">
                    <input
                      type="text"
                      placeholder="Name"
                      value={ingredient.name}
                      className="bg-[#C1D8C3] h-8 w-1/2 rounded-md"
                      onChange={(e) =>
                        handleIngredientChange(index, "name", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Quantity"
                      value={ingredient.quantity}
                      className="bg-[#C1D8C3] h-8 w-1/2 rounded-md"
                      onChange={(e) =>
                        handleIngredientChange(
                          index,
                          "quantity",
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
                <div className="flex gap-4 ml-[8rem] *:py-2 *:px-6 *:rounded-md *:bg-[#6A9C89] justify-start my-[0.95rem] whitespace-nowrap">
                  <button
                    type="button"
                    className="hover:bg-[#C1D8C3] w-1/2 mt-2"
                    onClick={handleAddIngredient}
                  >
                    Add Ingredient
                  </button>
                  <button
                    type="button"
                    className="hover:bg-[#C1D8C3] w-1/2 mt-2"
                    onClick={handleDeleteIngredient}
                  >
                    Delete Ingredient
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="instructions">Instructions:</label>
                <textarea
                  value={instructions.join("\n")}
                  cols={85}
                  rows={100}
                  name="instructions"
                  id="instructions"
                  className="bg-[#C1D8C3] h-96 w-full rounded-md"
                  onChange={(e) => {
                    const value = e.target.value.split("\n");
                    setInstructions(value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 ml-[8rem] *:py-2 *:px-6 *:rounded-md *:bg-[#6A9C89] justify-start my-[0.95rem]">
          <button type="submit" className="hover:bg-[#C1D8C3]">
            Edit
          </button>
          <button className="hover:bg-[#C1D8C3]" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipePage;
