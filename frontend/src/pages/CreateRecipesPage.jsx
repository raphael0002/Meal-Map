import { useState } from "react";
import omlet from "../assets/image-omelette.jpeg";

const CreateRecipesPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [ingredient, setIngredient] = useState([]);
  const [instruction, setInstruction] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [calories, setCalories] = useState("");
  const [category, setCategory] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(instruction);
  };
  return (
    <div className="flex flex-col bg-[#FFF5E4] p-0 rounded-xl md:w-3/4 lg:w-full">
      <h1 className="font-semibold text-3xl py-5 px-5">Create Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 px-10">
          <div className="flex justify-evenly gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 whitespace-nowrap">
                <label htmlFor="title">Recipe Name</label>
                <input
                  type="text"
                  value={title}
                  name="recipe-title"
                  id="title"
                  className="bg-[#C1D8C3] h-8 w-full rounded-md"
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
                  className="bg-[#C1D8C3] h-8 w-full rounded-md"
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
                  className="bg-[#C1D8C3] h-[10rem] w-full rounded-md"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex *:flex ml-[32px] gap-2 *:gap-2 whitespace-nowrap">
                <div>
                  <label htmlFor="">Prep Time:</label>
                  <input
                    value={prepTime}
                    type="text"
                    name="prep-time"
                    id="prep-time"
                    className="bg-[#C1D8C3] h-8 w-full rounded-md"
                    onChange={(e) => setPrepTime(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="">Calories:</label>
                  <input
                    type="text"
                    value={calories}
                    name="prep-time"
                    id="prep-time"
                    className="bg-[#C1D8C3] h-8 w-full rounded-md"
                    onChange={(e) => setCalories(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="">category:</label>
                  <input
                    type="text"
                    value={category}
                    name="prep-time"
                    id="prep-time"
                    className="bg-[#C1D8C3] h-8 w-full rounded-md"
                    onChange={(e) => {
                      const categories = e.target.value.split(",");
                      setCategory(categories);
                    }}
                  />
                </div>
              </div>
            </div>
            <img
              src={imgUrl ? imgUrl : omlet}
              alt="Recipe Image"
              width={384}
              className="h-auto w-96 rounded-md"
            />
          </div>
          <div className="flex justify-evenly items-center gap-4">
            <div className="flex flex-col items-end gap-4 ml-3">
              <div className="flex gap-2">
                <label htmlFor="">Ingredients:</label>
                <textarea
                  value={ingredient}
                  cols={50}
                  rows={100}
                  name="ingredients"
                  id="ingredients"
                  className="bg-[#C1D8C3] h-96 w-full rounded-md"
                  onChange={(e) => {
                    setIngredient(e.target.value.split(/[,|\n]+/));
                  }}
                />
              </div>

              <div className="flex gap-4 *:py-2 *:px-6 *:rounded-md *:bg-[#6A9C89] ">
                <button className="hover:bg-[#C1D8C3]">Edit</button>
                <button className="hover:bg-[#C1D8C3]">Save</button>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-2">
                <label htmlFor="">Instructions:</label>
                <textarea
                  value={instruction}
                  cols={85}
                  rows={100}
                  name="ingredients"
                  id="ingredients"
                  className="bg-[#C1D8C3] h-96 w-full rounded-md"
                  onChange={(e) => {
                    setInstruction(e.target.value.split(/[,|\n]+/));
                  }}
                />
              </div>
              <div className="flex gap-4 *:py-2 *:px-6 *:rounded-md *:bg-[#6A9C89] ">
                <button className="hover:bg-[#C1D8C3]">Edit</button>
                <button className="hover:bg-[#C1D8C3]">Save</button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 ml-[8rem] *:py-2 *:px-6 *:rounded-md *:bg-[#6A9C89] justify-start my-[0.95rem]">
          <button type="submit" className="hover:bg-[#C1D8C3]">
            Add
          </button>
          <button className="hover:bg-[#C1D8C3] ">Delete</button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipesPage;
