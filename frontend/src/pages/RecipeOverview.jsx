import { useParams } from "react-router-dom";
import { useRecipe } from "../context/recipeProvider";

const RecipeOverview = () => {
  const { recipes } = useRecipe();
  const { recipeId } = useParams();
  const recipeData = recipes.find((recipe) => recipe._id === recipeId);
  // console.log(recipeDatas);
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
        <h1 className="text-3xl">{recipeData.title}</h1>
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
                  <span className="font-semibold">
                    {recipeStep.instruction}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
        <hr />
      </div>
      {/* <div className="flex flex-col gap-4 text-rose-red w-full">
        <h2 className="text-2xl">Nutrition</h2>
        <p>
          The table below shows nutritional values per serving without the
          additional fillings.
        </p>
        <div>
          <table className="border-collapse w-full">
            <tbody> */}
      {/* {recipeData.nutritions.map((item, index) => (
                <tr
                  className={
                    index === recipeData.nutritions.length - 1
                      ? "border-b-0"
                      : "border-b border-gray-200"
                  }
                  key={index}
                >
                  <td className="px-10 py-2">{item.nutrient}</td>
                  <td className="px-4 font-semibold">{item.value}</td>
                </tr>
              ))} */}
      {/* </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};

export default RecipeOverview;
