import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";

const CreateRecipesPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([""]);
  const [prepTime, setPrepTime] = useState("");
  const [calories, setCalories] = useState("");
  const [servable, setServable] = useState("");
  const [category, setCategory] = useState([]);
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
      .post("http://localhost:3000/api/recipe/", recipeData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${value.token}`, // replace with your actual access token
        },
      })
      .then((response) => {
        console.log("Recipe created successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error creating recipe:", error);
        alert("Failed to create recipe. Please try again.");
      });

    // Clear form inputs
    setTitle("");
    setDescription("");
    setImgUrl("");
    setIngredients([{ name: "", quantity: "" }]);
    setInstructions([""]);
    setPrepTime("");
    setCalories("");
    setServable("");
    setCategory([]);
    alert("Recipe created successfully!");
  };

  return (
    <div className="flex flex-col bg-[#FFF5E4] p-4 rounded-xl w-full max-w-7xl mx-auto">
      <h1 className="font-semibold text-2xl md:text-3xl py-5 px-5">
        Create Recipe
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-6 px-4">
          <div className="flex flex-col gap-4 lg:w-2/3">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="font-semibold">
                Recipe Name
              </label>
              <input
                type="text"
                value={title}
                name="recipe-title"
                id="title"
                className="bg-[#C1D8C3] p-2 rounded-md w-full"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="image-url" className="font-semibold">
                Recipe Image URL
              </label>
              <input
                type="text"
                value={imgUrl}
                name="recipe-image"
                id="image-url"
                className="bg-[#C1D8C3] p-2 rounded-md w-full"
                onChange={(e) => setImgUrl(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <textarea
                value={description}
                rows={4}
                name="recipe-description"
                id="description"
                className="bg-[#C1D8C3] p-2 rounded-md w-full"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label htmlFor="prep-time" className="font-semibold">
                  Prep Time:
                </label>
                <input
                  value={prepTime}
                  type="text"
                  name="prep-timeField"
                  id="prep-time"
                  className="bg-[#C1D8C3] p-2 rounded-md w-full"
                  onChange={(e) => setPrepTime(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="calories" className="font-semibold">
                  Calories:
                </label>
                <input
                  type="text"
                  value={calories}
                  name="caloriesField"
                  id="calories"
                  className="bg-[#C1D8C3] p-2 rounded-md w-full"
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="category" className="font-semibold">
                  Category:
                </label>
                <input
                  type="text"
                  value={category}
                  name="categoryField"
                  id="category"
                  className="bg-[#C1D8C3] p-2 rounded-md w-full"
                  onChange={(e) => {
                    const categories = e.target.value.split(",");
                    setCategory(categories);
                  }}
                />
              </div>
              <div>
                <label htmlFor="servable" className="font-semibold">
                  Servable:
                </label>
                <input
                  type="text"
                  value={servable}
                  name="servableField"
                  id="servable"
                  className="bg-[#C1D8C3] p-2 rounded-md w-full"
                  onChange={(e) => setServable(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 mt-8">
            <img
              src={
                imgUrl ||
                "https://www.foodandwine.com/thmb/fjNakOY7IcuvZac1hR3JcSo7vzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-pasta-sausage-basil-and-mustard-hero-06-cfd1c0a2989e474ea7e574a38182bbee.jpg"
              }
              alt="Recipe Image"
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 px-4">
          <div className="w-full">
            <label htmlFor="ingredients" className="font-semibold">
              Ingredients:
            </label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 py-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={ingredient.name}
                  className="bg-[#C1D8C3] p-2 rounded-md w-1/2"
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  className="bg-[#C1D8C3] p-2 rounded-md w-1/2"
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                />
              </div>
            ))}
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                className="bg-[#6A9C89] text-white py-2 px-4 rounded-md hover:bg-[#C1D8C3]"
                onClick={handleAddIngredient}
              >
                Add Ingredient
              </button>
              <button
                type="button"
                className="bg-[#6A9C89] text-white py-2 px-4 rounded-md hover:bg-[#C1D8C3]"
                onClick={handleDeleteIngredient}
              >
                Delete Ingredient
              </button>
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="instructions" className="font-semibold">
              Instructions:
            </label>
            <textarea
              value={instructions.join("\n")}
              cols={30}
              rows={8}
              name="instructions"
              id="instructions"
              className="bg-[#C1D8C3] p-2 rounded-md w-full"
              onChange={(e) => setInstructions(e.target.value.split("\n"))}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-4 px-4">
          <button
            type="submit"
            className="bg-[#6A9C89] text-white py-2 px-6 rounded-md hover:bg-[#C1D8C3]"
          >
            Add
          </button>
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipesPage;
