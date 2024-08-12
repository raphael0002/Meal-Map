// import ham_menu from "../assets/ham-menu.png";
// import Avatar from "../assets/avatar.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faUtensils,
//   faSearch,
//   faBasketShopping,
//   faCalendar,
// } from "@fortawesome/free-solid-svg-icons";

// const NavBar = () => {
//   return (
//     <div className="NavBar fixed w-[18%] h-screen p-4 bg-sidebar">
//       <div className="top flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold font-poppins">Meal Map</h1>
//         <div className="p-1 rounded-md bg-[#e7e7e7] hover:bg-[#dcdcdc]">
//           <img src={ham_menu} alt="menu" className="h-[24px]" />
//         </div>
//       </div>
//       <div className="flex items-center gap-2 py-1 w-full rounded-[12px] transition-all duration-100 ease-in px-3 hover:bg-primary hover:bg-opacity-70">
//         <img
//           src={Avatar}
//           alt="user"
//           className=" w-[50px] rounded-[6px] outline-black outline outline-2 outline-offset-2"
//         />
//         <div className="p-2">
//           <p className="font-bold text-lg">Rohan Shrestha</p>
//           <p className="text-sm">Cook</p>
//         </div>
//       </div>
//       <div className="w-full h-[1px] bg-black"></div>
//       <div className="NavLinks">
//         <div className="w-full flex items-center py-3">
//           <input
//             type="text"
//             placeholder="Search for recipes....."
//             className="relative h-[2.5rem] w-full border-2 border-gray-300 p-1 rounded-md focus:outline-none pl-9"
//           />
//           <FontAwesomeIcon icon={faSearch} className="absolute h-4 left-7" />
//         </div>
//         <ul className="flex flex-col gap-5 justify-center items-center mt-3 *:flex *:font-semibold *:gap-2 *:items-center *:rounded-[6px] *:transition-all *:duration-100 *:ease-in *:py-3 *:px-5 *:w-full">
//           <li className="hover:bg-primary">
//             <FontAwesomeIcon icon={faUtensils} size="lg" />
//             <span>Browse Recipes</span>
//           </li>
//           <li className="hover:bg-primary">
//             <FontAwesomeIcon icon={faCalendar} size="lg" />
//             <span>Meal Plan</span>
//           </li>
//           <li className="hover:bg-primary">
//             <FontAwesomeIcon icon={faBasketShopping} size="lg" />
//             <span>Groceries</span>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default NavBar;
