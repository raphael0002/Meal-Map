// import NavBar from "../components/NavBar";
// import Recipes from "../components/Recipes";
import {
  Calendar,
  DiamondPlus,
  CookingPot,
  ShoppingBasket,
  BookMarked,
} from "lucide-react";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState } from "react";

const HomePage = () => {
  const [expanded, setExpanded] = useState(true);
  const { value } = useAuth();
  return (
    <div className="flex bg-[#FFF5E4]">
      <div className="flex fixed z-10">
        <Sidebar expanded={expanded} setExpanded={setExpanded}>
          <SidebarItem
            icon={<CookingPot size={20} />}
            text="Browse Recipes"
            linkTo="/BrowseRecipes"
          />
          {value.role === "cook" && (
            <>
              <SidebarItem
                icon={<DiamondPlus size={20} />}
                text="Add Recipes"
                linkTo="/CreateRecipe"
              />
              <SidebarItem
                icon={<BookMarked size={20} />}
                text="My Recipes"
                linkTo="/My-Recipes"
              />
            </>
          )}
          <div className="w-full my-2 h-[1px] bg-[#FFF5E4] "></div>
          <SidebarItem
            icon={<Calendar size={20} />}
            text="Meal Plan"
            linkTo="/Meal-Planner"
          />
          <SidebarItem
            icon={<ShoppingBasket size={20} />}
            text="Groceries"
            linkTo="/Shopping-Cart"
          />
          <div className="w-full h-[1.5px] bg-[#FFF5E4] my-2"></div>
          {/* <SidebarItem icon={<Settings size={20} />} text="Settings" /> */}
        </Sidebar>
      </div>
      <div
        className={`flex-1 p-4 min-h-screen transition-margin duration-300 ${
          !expanded ? "ml-28" : "ml-[315px]"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
