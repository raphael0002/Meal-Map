import { menu_lst } from "../data/recipeData";
const ExploreMenu = ({ category, setCategory }) => {
  console.log(category);
  return (
    <div className="">
      <h1 className="font-semibold text-2xl mb-4">Explore Menu</h1>
      <div className="grid grid-cols-5 gap-6 my-2">
        {menu_lst.map((menu, i) => {
          return (
            <div
              key={i}
              className={`flex gap-4 items-center rounded-lg py-1 px-1 font-medium cursor-pointer transition-all max-md:flex-col max-md:gap-1 max-md:max-w-[5rem] max-md:text-sm ${
                category === menu.name ? "bg-[#6A9C89]" : "bg-[#CD5C08]"
              }`}
              onClick={() =>
                setCategory((prev) => (prev === menu.name ? "All" : menu.name))
              }
            >
              <img
                src={menu.img}
                alt={menu.name}
                className="h-10 w-10 object-cover rounded-md max-md:w-[5rem]"
              />
              <p className="text-[#FFF5E4] ">{menu.name}</p>
            </div>
          );
        })}
      </div>
      <hr className="my-3 h-[1px] bg-[#6A9C89] border-none" />
    </div>
  );
};

export default ExploreMenu;
