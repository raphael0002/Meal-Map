import axios from "axios";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import ShoppingCartCard from "../components/ShoppingCartCard";

const ShoppingCart = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const { value } = useAuth();
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");

  const handleAddIngredient = () => {
    // Ensure we update the `ingredients` state correctly by preserving the existing array
    const newIngredient = [
      {
        name: ingredientName,
        quantity: ingredientQuantity,
      },
    ];
    handleSubmit(newIngredient);
    setIngredientName("");
    setIngredientQuantity("");
  };

  const handleSubmit = async (newIngredient) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/user/shopping-list`,
        { ingredients: newIngredient },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${value.token}`,
          },
        }
      );
      fetchShoppingList();
      console.log("Shopping list updated successfully");
    } catch (error) {
      console.error("Error updating shopping list:", error);
    }
  };

  const fetchShoppingList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/shopping-list`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${value.token}`,
          },
        }
      );
      console.log(response.data.data);
      setShoppingList(response.data.data);
    } catch (error) {
      console.error("Error fetching shopping list:", error);
    }
  };

  useEffect(() => {
    fetchShoppingList();
  }, [value]);

  return (
    <div className="shopping-cart">
      <h2 className="text-2xl font-semibold">Your Shopping List</h2>
      <div className="">
        <div className="flex gap-3 mt-5 px-5 max-md:flex-col">
          <input
            type="text"
            value={ingredientName}
            id="ingredientId"
            placeholder="Ingredient Name..."
            className="bg-[#C1D8C3] pl-3 h-8 w-[30%] rounded-md max-md:w-full"
            onChange={(e) => setIngredientName(e.target.value)}
          />
          <input
            type="text"
            value={ingredientQuantity}
            placeholder="Quantity"
            className="bg-[#C1D8C3] pl-3 h-8 w-[30%] rounded-md max-md:w-full"
            onChange={(e) => setIngredientQuantity(e.target.value)}
          />
          <button
            type="button"
            className="hover:bg-[#C1D8C3] bg-[#C1D8C3] px-3 py-1 rounded-md"
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </button>
        </div>
        <div className="p-5 grid grid-cols-2 gap-1 max-md:grid-cols-1">
          {shoppingList.map((items, index) => (
            <ShoppingCartCard
              key={index}
              items={items}
              shoppingList={shoppingList}
              setShoppingList={setShoppingList}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
