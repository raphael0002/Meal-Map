import axios from "axios";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import ShoppingCartCard from "../components/ShoppingCartCard";

const ShoppingCart = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const { value } = useAuth();

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
  }, []);

  return (
    <div className="shopping-cart">
      <h2>Your Shopping List</h2>
      <div className="">
        <div className="p-5 grid grid-cols-2 gap-1">
          {shoppingList.map((items, index) => (
            <ShoppingCartCard key={index} shoppingList={items} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
