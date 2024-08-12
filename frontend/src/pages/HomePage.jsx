// import NavBar from "../components/NavBar";
import Recipes from "../components/Recipes";
import {
  Calendar,
  DiamondPlus,
  Settings,
  CookingPot,
  ShoppingBasket,
  BookMarked,
} from "lucide-react";
import Sidebar, { SidebarItem } from "../components/Sidebar";

const HomePage = () => {
  return (
    <div className="flex">
      <div className="flex">
        <Sidebar>
          <SidebarItem icon={<CookingPot size={20} />} text="Browse Recipes" />
          <SidebarItem icon={<DiamondPlus size={20} />} text="Add Recipes" />
          <SidebarItem icon={<BookMarked size={20} />} text="My Recipes" />
          <div className="w-full my-2 h-[1px] bg-gray-500"></div>
          <SidebarItem icon={<Calendar size={20} />} text="Meal Plan" />
          <SidebarItem icon={<ShoppingBasket size={20} />} text="Groceries" />
          <div className="w-full h-[1.5px]  bg-gray-500 my-2"></div>
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
        </Sidebar>
      </div>
      <Recipes />
    </div>
  );
};

export default HomePage;
