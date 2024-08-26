import { useState } from "react";
import { Sun, Moon } from "lucide-react";
// eslint-disable-next-line react/prop-types
const DarkModeToggler = ({ expanded }) => {
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div
      className={`relative flex gap-2 items-center py-2 px-3 my-1 font-medium dark:text-white rounded-md cursor-pointer transition-colors ml-3 mr-3 group ${
        expanded
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-200 text-gray-600 hover:text-indigo-800"
      }`}
    >
      <button onClick={() => darkModeHandler()}>
        {dark && <Sun className="text-indigo-800 dark:text-white" />}
        {!dark && <Moon />}
      </button>
      <p className={`${expanded ? "text-indigo-800" : "hidden"}`}>
        ThemeToggler
      </p>
      {!expanded && (
        <div
          className={`absolute whitespace-nowrap left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          Theme Toggler
        </div>
      )}
    </div>
  );
};

export default DarkModeToggler;
