/* eslint-disable react/prop-types */
import { X } from "lucide-react";

const SearchBox = ({ setIsSearchOpen, setSearchQuery, searchQuery }) => {
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const closeSearchBox = () => {
    setIsSearchOpen(false);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
      <div className="relative w-4/5 max-w-[50%]">
        <input
          type="text"
          value={searchQuery}
          placeholder="Search for recipes..."
          className="w-full p-4 text-lg rounded-md bg-[#C1D8C3] focus:bg-[#C1D8C3] focus:outline-none focus:ring-2 focus:ring-[#6A9C89] focus:border-transparent"
          onChange={handleSearch}
          autoFocus
        />
        <button
          className="absolute top-2 right-2 p-2 text-white"
          onClick={closeSearchBox}
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
