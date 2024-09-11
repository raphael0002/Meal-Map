import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/HomePage";
import CreateRecipesPage from "./pages/CreateRecipesPage";
import BrowseRecipes from "./pages/BrowseRecipes";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import MealPlannerPage from "./pages/MealPlannerPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import MyRecipesPage from "./pages/MyRecipesPage";
import RecipeOverview from "./pages/RecipeOverview";
import ProfilePage from "./pages/ProfilePage";
import { useState } from "react";
import EditRecipePage from "./pages/EditRecipePage";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </ProtectedRoutes>
          }
        >
          <Route
            path="/Overview/:recipeId/:recipeName"
            element={
              <ProtectedRoutes>
                <RecipeOverview />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/CreateRecipe"
            element={
              <ProtectedRoutes>
                <CreateRecipesPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/EditRecipe/:recipeIdForEdit/edit"
            element={
              <ProtectedRoutes>
                <EditRecipePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/BrowseRecipes"
            element={
              <ProtectedRoutes>
                <BrowseRecipes searchQuery={searchQuery} />
              </ProtectedRoutes>
            }
          />
          <Route path="/Meal-Planner" element={<MealPlannerPage />} />
          <Route path="/Shopping-Cart" element={<ShoppingCartPage />} />
          <Route path="/My-Recipes" element={<MyRecipesPage />} />
          <Route
            path="/Profile"
            element={
              <ProtectedRoutes>
                <ProfilePage />
              </ProtectedRoutes>
            }
          />
        </Route>
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
