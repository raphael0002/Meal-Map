/* eslint-disable react/prop-types */
import {
  AlignJustify,
  MoreVertical,
  X,
  Search,
  User,
  LogOut,
} from "lucide-react";
// import logo from "../assets/logo.png";
import avatar from "../assets/avatar.png";
import { createContext, useContext, useState } from "react";
// import DarkModeToggler from "./DarkModeToggler";
import { Link, useLocation } from "react-router-dom";

const SidebarContext = createContext();

const Sidebar = ({ expanded, setExpanded, setSearchQuery, children }) => {
  const [threeDotFn, setThreeDotFn] = useState(true);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-[#CD5C08] dark:bg-gray-600 border-r shadow-sm px-3 transition-all duration-500">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Link to="/BrowseRecipes">
            <h1
              className={`overflow-hidden text-2xl font-bold font-poppins transition-all ${
                expanded ? "w-32" : "w-0 hidden"
              }
            }`}
            >
              Meal Map
            </h1>
          </Link>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-[#6A9C89] hover:bg-[#C1D8C3]"
          >
            {expanded ? <X /> : <AlignJustify />}
          </button>
        </div>

        <div className="w-full px-3">
          <Search
            className={`absolute z-10 p-[10px] h-10 w-11 rounded-tl-lg rounded-bl-lg transition-all ${
              expanded
                ? ""
                : "relative rounded-lg hover:bg-indigo-200 hover:text-indigo-800 dark:text-white"
            }`}
          />
          <input
            type="text"
            placeholder="Search for recipes..."
            className={`relative w-full p-2 pl-11 rounded-lg bg-[#C1D8C3] focus:bg-[#C1D8C3] focus:outline-none focus:ring-2 focus:ring-[#6A9C89] focus:border-transparent ${
              expanded ? "w-52" : "w-0 hidden"
            }`}
            onChange={handleSearch}
          />
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 ">{children}</ul>
        </SidebarContext.Provider>
        {/* <DarkModeToggler expanded={expanded} /> */}
        <div className="border-t flex p-3 text-[#FFF5E4]">
          <img src={avatar} className="w-10 h-10 rounded-md" />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all  ${
              expanded ? "w-52 ml-3" : "w-0"
            } `}
          >
            <div className="relative leading-4 dark:text-white">
              <h4 className="font-semibold">Rohan Shrestha</h4>
              <span className="text-xs text-black font-semibold dark:text-white">
                rohan@gmail.com
              </span>
            </div>
            <MoreVertical
              size={20}
              className="h-9 hover:rounded-md hover:bg-[#C1D8C3] hover:text-gray-600 cursor-pointer dark:text-white"
              onClick={() => setThreeDotFn((curr) => !curr)}
            />
            {!threeDotFn && (
              <div
                className={`absolute whitespace-nowrap rounded-md bottom-[4.5rem] left-[12rem] text-sm -translate-x-3 transition-all ${
                  threeDotFn ? "visible translate-x-0" : ""
                } ${!expanded ? "w-0 hidden" : ""}`}
                onClick={() => setThreeDotFn(true)}
              >
                <ul className="*:flex *:h-[3rem] *:w-[8rem] bg-gray-600 *:text-white *:font-semibold *:cursor-pointer rounded-md">
                  <Link
                    to="/Profile"
                    className="hover:bg-orange-700 justify-center items-center hover:rounded-t-md gap-2"
                  >
                    <User size={20} />
                    Profile
                  </Link>
                  <li className="hover:bg-orange-700 justify-center items-center hover:rounded-b-md gap-2">
                    <LogOut size={18} />
                    log out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
};
export function SidebarItem({ icon, text, linkTo }) {
  const { expanded } = useContext(SidebarContext);
  const location = useLocation();
  const isActive = location.pathname === linkTo;
  return (
    <li>
      <Link
        to={linkTo}
        className={`relative flex items-center py-2 px-3 my-1 font-medium text-[#FFF5E4] dark:text-white rounded-md cursor-pointer group ${
          isActive
            ? "bg-[#F1DEC6] text-black"
            : "hover:bg-[#F1DEC6] hover:text-black"
        }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0 hidden"
          }`}
        >
          {text}
        </span>

        {!expanded && (
          <div
            className={`absolute whitespace-nowrap left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </Link>
    </li>
  );
}

export default Sidebar;
