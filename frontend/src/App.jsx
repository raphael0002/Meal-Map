import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/HomePage";
import CreateRecipesPage from "./pages/CreateRecipesPage";
import BrowseRecipes from "./pages/BrowseRecipes";
import ProtectedRoutes from "./utils/ProtectedRoutes";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        >
          <Route path="/CreateRecipe" element={<CreateRecipesPage />} />
          <Route path="/BrowseRecipes" element={<BrowseRecipes />} />
        </Route>
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
