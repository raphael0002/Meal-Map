/* eslint-disable react/prop-types */
import axios from "axios";
import { useAuth } from "../context/authContext";

const ShoppingCartCard = ({ items, shoppingList, setShoppingList }) => {
  console.log(items);
  const { value } = useAuth();
  const ingredients = items.ingredient.slice(1, items.ingredient.length);
  const deleteShoppingCart = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/user/shopping-list/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${value.token}`,
        },
      });
      setShoppingList(shoppingList.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error fetching shopping list:", error);
    }
  };
  return (
    <div className="flex flex-col justify-between bg-[#6A9C89] w-full rounded-lg">
      <ul className="flex flex-wrap justify-evenly">
        {ingredients.map((ingredient, index) => {
          if (ingredient[0]) {
            return null;
          } else {
            return (
              <div
                key={index}
                className="flex bg-[#C1D8C3] justify-evenly py-4 px-3 mt-3 mx-3 rounded-md shadow-md whitespace-nowrap w-full"
              >
                <li className="">{ingredient.name}</li>
                <span>-</span>
                <li className="">{ingredient.quantity}</li>
              </div>
            );
          }
        })}
      </ul>

      <button
        className="px-3 py-2 my-3 mx-3 bg-red-700 hover:bg-red-600 text-[#FFF5E4] rounded-md transition-all"
        onClick={() => deleteShoppingCart(items._id)}
      >
        Delete
      </button>
    </div>
  );
};

export default ShoppingCartCard;
